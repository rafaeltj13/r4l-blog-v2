export interface NavigationLink {
    label: string;
    to: string;
    icon: string;
}

/**
 * Shared navigation links used across the app header (desktop + mobile).
 * Labels come from i18n so they react to locale switches.
 */
export function useNavigationLinks(): ComputedRef<NavigationLink[]> {
    const { t } = useI18n();
    return computed(() => [
        { label: t("nav.posts"), to: "/posts", icon: "uil:newspaper" },
        { label: t("nav.experience"), to: "/experience", icon: "uil:briefcase" },
        { label: t("nav.projects"), to: "/projects", icon: "uil:folder" },
        { label: t("nav.chat"), to: "/chat", icon: "uil:comment-dots" },
        { label: t("nav.about"), to: "/about", icon: "uil:user" },
    ]);
}
