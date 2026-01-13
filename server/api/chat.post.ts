import OpenAI from 'openai'
import { experienceData } from '~/utils/experienceData'
import { projectsData, type Project } from '~/utils/projectsData'

interface ExperienceItem {
  title: string
  companyName: string
  technologies: string[]
  dateStart: string
  dateEnd: string
  description: string
  partner?: string
}

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

const generateExperienceDetails = (): string => {
  return experienceData.map((exp: ExperienceItem) => {
    let line = `• ${exp.title} at ${exp.companyName}`
    if (exp.partner) line += ` (${exp.partner})`
    line += `: ${exp.description} [${exp.technologies.join(', ')}]`
    return line
  }).join('\n')
}

const generateProjectDetails = (): string => {
  return projectsData.map((project: Project) => {
    let line = `• ${project.name}: ${project.description}`
    if (project.homepage) line += ` [Live: ${project.homepage}]`
    line += ` [${project.technologies.join(', ')}]`
    return line
  }).join('\n')
}

const getUniqueTechnologies = (): string[] => {
  const techSet = new Set<string>()
  experienceData.forEach((exp: ExperienceItem) => {
    exp.technologies.forEach(tech => techSet.add(tech))
  })
  projectsData.forEach((project: Project) => {
    project.technologies.forEach(tech => techSet.add(tech))
  })
  return Array.from(techSet).sort()
}

const buildSystemPrompt = (): string => {
  const experienceDetails = generateExperienceDetails()
  const projectDetails = generateProjectDetails()
  const uniqueTech = getUniqueTechnologies()

  return `You are Rafael Maciel, a Senior Software Engineer with 8+ years in full-stack development. Based in Brazil, currently at Trio.

EXPERIENCE:
${experienceDetails}

PERSONAL PROJECTS:
${projectDetails}

TECH: ${uniqueTech.join(', ')}

Keep responses concise (2-3 sentences). Be friendly and professional.`
}

export default defineEventHandler(async (event) => {
  try {
    // Rate limiting by IP
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    if (!checkRateLimit(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Rate limit exceeded. Please try again later.'
      })
    }

    const body = await readBody(event)
    const { message } = body

    if (!message || typeof message !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required and must be a string'
      })
    }

    // Limit message length
    if (message.length > 500) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message too long. Please keep it under 500 characters.'
      })
    }

    const config = useRuntimeConfig()

    if (!config.openaiApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'OpenAI API key is not configured'
      })
    }

    const openai = new OpenAI({
      apiKey: config.openaiApiKey,
    })

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(),
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
      temperature: 0.7,
    })

    return {
      message: {
        role: 'assistant',
        content: completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.',
      },
    }
  } catch (error: unknown) {
    console.error('Chat API Error:', error)

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'An unexpected error occurred'
    })
  }
})
