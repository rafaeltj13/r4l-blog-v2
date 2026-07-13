export interface NavigationLink {
    label: string;
    to: string;
    icon: string;
}

/**
 * Shared navigation links used across the app header (desktop + mobile).
 */
export function useNavigationLinks(): NavigationLink[] {
    return [
        { label: "Posts", to: "/posts", icon: "uil:newspaper" },
        { label: "Experience", to: "/experience", icon: "uil:briefcase" },
        { label: "Projects", to: "/projects", icon: "uil:folder" },
        { label: "Chat", to: "/chat", icon: "uil:comment-dots" },
        { label: "About", to: "/about", icon: "uil:user" },
    ];
}
