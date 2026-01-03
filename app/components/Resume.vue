<script setup lang="ts">
import { experienceData } from '~/utils/experienceData'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  showButton?: boolean
}>(), {
  showButton: true
})

const contactInfo = {
  location: "João Pessoa/PB, Brazil (GMT -3)",
  phone: "+55 83 98113-1924",
  email: "rafael.damaciel@proton.me"
}

const education = {
  institution: "Federal University of Campina Grande - UFCG",
  degree: "Bachelor of Computer Science", // Inferred from "Bachelor" and typical UFCG degree
  period: "2015 - 2019",
  details: ["Participation in Monitoring Projects:", "Programming Laboratory II"]
}

const header = {
  name: "Rafael de Araújo Maciel",
  links: [
    { text: "https://www.linkedin.com/in/rafael-de-ara%C3%BAjo-14b5b1117/", url: "https://www.linkedin.com/in/rafael-de-ara%C3%BAjo-14b5b1117/" },
    { text: "https://github.com/rafaeltj13", url: "https://github.com/rafaeltj13" }
  ],
  summary: "Senior Software Engineer with 7+ years of expertise specializing in full-stack web development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and Node.js. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication."
}

// Helper to group experience by company
const groupedExperience = computed(() => {
  const groups: Record<string, any> = {}
  
  experienceData.forEach(item => {
    if (!groups[item.companyName]) {
      groups[item.companyName] = {
        name: item.companyName,
        title: item.title,
        location: getCompanyLocation(item.companyName),
        period: "",
        items: [],
        dateStart: item.dateStart,
        dateEnd: item.dateEnd
      }
    }
    groups[item.companyName].items.push(item)
  })

  return Object.values(groups).map(group => {
    const dates = group.items.map((i: any) => ({ start: new Date(i.dateStart), end: new Date(i.dateEnd) }))
    const latestItem = group.items[0]
    const earliestItem = group.items[group.items.length - 1]
    
    const formatDate = (d: string) => {
        const date = new Date(d);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
    
    let period = `${formatDate(earliestItem.dateStart)} - ${formatDate(latestItem.dateEnd)}`
    if (group.name === 'Trio') {
        const hasFuture = new Date(latestItem.dateEnd) > new Date()
        if (hasFuture || latestItem.dateEnd.startsWith('2026')) period = "Jul/2021 - Current"
    }

    return {
      ...group,
      period
    }
  })
})

function getCompanyLocation(name: string) {
    if (name === 'Trio') return 'Boston, US | Remote'
    if (name === 'Xtra Holdings LLC') return 'Sarasota, US | Remote' 
    if (name === 'Lella.co') return 'Poland | Remote' 
    if (name === 'Software Practices Laboratory' || name === 'Software Practices Laboratory - SPLab') return 'Brazil'
    return ''
}

// Categorized Skills
const categorizedSkills = computed(() => {
    const allTechs = new Set<string>();
    experienceData.forEach(item => {
        item.technologies?.forEach(t => allTechs.add(t));
    });
    
    // Add manual skills that might not be in the projects data but are in the original list
    ["TypeScript", "JavaScript", "Git"].forEach(s => allTechs.add(s));

    const categories = {
        "Languages": ["JavaScript", "TypeScript", "SQL", "HTML", "CSS", "MIML"],
        "Frameworks & Libraries": ["React.js", "React", "Vue.js", "Next.js", "Nuxt.js", "React Native", "Node.js", "Express", "FastAPI", "Angular.js", "ASP.NET", "Pinia", "Storybook"],
        "Testing": ["Jest", "Vitest", "Playwright", "Maestro"],
        "Data & Cloud": ["MySQL", "MongoDB", "SQL Server", "Google BigQuery", "Google ADK", "AWS", "Kubernetes", "Sequelize", "Stripe (Software)"]
    };

    const result: Record<string, string[]> = {};
    const used = new Set<string>();

    // Sort into categories
    Object.entries(categories).forEach(([cat, keywords]) => {
        // keywords are candidates. We check if 'allTechs' has them.
        // Also check if 'allTechs' has items that CONTAIN these keywords? No, precise match or close match.
        // experienceData usually has formatting; e.g. "React.js" vs "React". 
        // Let's filter allTechs based on our categorization lists.
        
        const matched = Array.from(allTechs).filter(tech => {
             // simplified normalization for check
             if (used.has(tech)) return false;
             
             const isMatch = keywords.some(k => 
                tech.toLowerCase() === k.toLowerCase() || 
                (k === "React" && tech === "React.js") ||
                (k === "React.js" && tech === "React")
             );
             
             if (isMatch) used.add(tech);
             return isMatch;
        });

        if (matched.length > 0) {
            result[cat] = matched.sort();
        }
    });

    // Add "Other" if needed, or explicitly ensure important ones are present.
    // Let's assume the mapping covers most.
    
    return result;
});

const downloadPDF = async () => {
  console.log('downloadPDF')
}
</script>

<template>
  <div class="resume-wrapper w-full max-w-5xl mx-auto bg-white shadow-xl p-8 md:p-12 print:p-0 print:shadow-none print:max-w-none text-slate-800">
    
    <!-- Top Header -->
    <header class="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-gray-200 pb-8">
      <!-- Name & Title -->
      <div class="max-w-2xl">
        <h1 class="text-5xl font-bold text-primary mb-4 tracking-tight">{{ header.name }}</h1>
        <div class="text-slate-600 text-sm leading-relaxed max-w-xl">
          {{ header.summary }}
        </div>
      </div>
      
      <!-- Contact Info -->
      <div class="flex flex-col items-start md:items-end gap-1.5 text-sm font-mono mt-6 md:mt-1 shrink-0">
        <a :href="'mailto:' + contactInfo.email" class="text-slate-500 hover:text-primary transition-colors">{{ contactInfo.email }}</a>
        <a :href="'tel:' + contactInfo.phone" class="text-slate-500 hover:text-primary transition-colors">{{ contactInfo.phone }}</a>
        
        <div class="flex flex-col items-start md:items-end">
             <a v-for="link in header.links" :key="link.url" 
                :href="link.url" 
                target="_blank" 
                class="text-primary hover:text-primary/80 hover:underline transition-colors block max-w-[200px] md:max-w-none truncate md:overflow-visible md:whitespace-normal text-right">
              {{ link.text.includes('linkedin') ? 'linkedin.com/in/rafael-de-araujo' : link.text.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') }}
            </a>
        </div>

        <p class="text-slate-400 mt-1">{{ contactInfo.location }}</p>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
      
      <!-- Left Column (Main Experience) - 66% width -->
      <div class="md:col-span-8 flex flex-col gap-10">
        
        <!-- Experience Section -->
        <section>
          <h2 class="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            Relevant Experience
          </h2>
          
          <div class="space-y-10">
            <div v-for="group in groupedExperience" :key="group.name" class="group">
              
              <!-- Job Header -->
              <div class="mb-3">
                <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                   <h3 class="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{{ group.title }}</h3>
                   <span class="text-xs font-mono text-slate-500 whitespace-nowrap hidden sm:block">{{ group.period }}</span>
                </div>
                <div class="flex items-center text-sm text-slate-600 font-medium">
                   <span>{{ group.name }}</span>
                   <span v-if="group.location" class="mx-2 text-slate-300">|</span>
                   <span v-if="group.location" class="text-slate-500 font-normal">{{ group.location }}</span>
                   <!-- Mobile Period -->
                   <span class="sm:hidden ml-auto text-xs font-mono text-slate-500">{{ group.period }}</span>
                </div>
              </div>

              <!-- Projects List -->
              <ul class="list-disc list-outside ml-4 space-y-4 marker:text-primary/50">
                <li v-for="(project, idx) in group.items" :key="idx" class="text-sm leading-relaxed text-slate-600 pl-1">
                   <span class="block mb-1">{{ project.description }}</span>
                   <div v-if="project.technologies && project.technologies.length" class="flex flex-wrap gap-1 mt-1.5 opacity-90">
                       <span v-for="tech in project.technologies" :key="tech" 
                             class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                         {{ tech }}
                       </span>
                   </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>

      <!-- Right Column (Sidebar) - 33% width -->
      <div class="md:col-span-4 flex flex-col gap-10">
        
        <!-- Skills -->
        <section>
          <h2 class="text-2xl font-bold text-primary mb-6">Skills</h2>
          
          <div class="border-l-2 border-primary/20 pl-4 py-1">
            <div class="flex flex-col gap-6">
              <div v-for="(items, category) in categorizedSkills" :key="category">
                  <h3 class="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide opacity-90">{{ category }}</h3>
                  <div class="flex flex-wrap gap-x-1.5 gap-y-1">
                      <span class="text-sm text-slate-600 leading-relaxed">
                          {{ items.join(', ') }}
                      </span>
                  </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-2xl font-bold text-primary mb-6">Education</h2>
          
          <div class="border-l-2 border-primary/20 pl-4 py-1">
            <h3 class="font-bold text-slate-900 leading-tight">{{ education.institution }}</h3>
            <div class="text-sm text-slate-700 mt-2 font-medium">{{ education.degree }}</div>
            <div class="text-xs text-slate-500 mt-1 mb-3 font-mono">{{ education.period }}</div>
            <ul class="list-none space-y-1 text-sm text-slate-600">
               <li v-for="(line, idx) in education.details" :key="idx" class="flex items-start gap-2">
                 <span class="mt-1.5 w-1 h-1 bg-primary rounded-full shrink-0"></span>
                 <span>{{ line }}</span>
               </li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  </div>
  
  <!-- Floating Export Button -->
  <Teleport to="body">
    <Transition 
      appear
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div v-if="showButton" class="fixed bottom-8 right-8 print:hidden z-[100]">
        <button @click="downloadPDF" class="btn btn-circle btn-lg bg-primary hover:bg-primary/90 text-white border-none shadow-xl tooltip tooltip-left" data-tip="Download PDF">
          <Icon name="uil:download-alt" :size="24" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@page {
    margin: 0;
    size: auto;
}
.resume-wrapper {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
/* For print PDF accuracy */
@media print {
    .resume-wrapper {
        box-shadow: none;
        max-width: none;
        width: 100%;
    }
}
</style>
