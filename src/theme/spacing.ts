/**
 * Standardized spacing system based on Material-UI's 8px base unit
 * 
 * Usage:
 * - Static spacing: sx={{ p: spacing.md }} -> 24px
 * - Responsive spacing: sx={{ p: spacing.responsive.md }} -> { xs: 1.5, sm: 2 } -> 12px/16px
 */

export const spacing = {
  // Static spacing values (for theme.spacing() multiplication)
  // These are 8px base unit multipliers
  none: 0,      // 0px
  xs: 0.5,      // 4px
  sm: 1,        // 8px
  md: 1.5,      // 12px
  lg: 2,        // 16px
  xl: 3,        // 24px
  xxl: 4,       // 32px

  // Responsive spacing objects
  // Follow mobile-first approach: smaller screens -> larger screens
  responsive: {
    // Extra small: 4px -> 8px
    xs: { xs: 0.5, sm: 1 },
    
    // Small: 8px -> 12px  
    sm: { xs: 1, sm: 1.5 },
    
    // Medium: 12px -> 16px (most common pattern)
    md: { xs: 1.5, sm: 2 },
    
    // Large: 16px -> 24px
    lg: { xs: 2, sm: 3 },
    
    // Extra large: 24px -> 32px
    xl: { xs: 3, sm: 4 },
    
    // 2X large: 32px -> 48px
    xxl: { xs: 4, sm: 6 },
  },

  // Component-specific spacing for semantic use
  // These provide consistent spacing across similar UI elements
  component: {
    // Card spacing
    cardPadding: { xs: 1.5, sm: 2 },           // Standard card content padding
    cardGap: { xs: 1.5, sm: 2 },              // Gap between card elements
    cardMargin: { xs: 1, sm: 1.5 },           // Margin between card items
    
    // Button spacing
    buttonPadding: { xs: 3, sm: 4 },          // Horizontal button padding
    buttonGap: { xs: 1, sm: 2 },              // Gap between buttons
    
    // Form spacing
    formFieldGap: { xs: 2, sm: 3 },           // Gap between form fields
    formSectionGap: { xs: 3, sm: 4 },         // Gap between form sections
    
    // Layout spacing
    sectionPadding: { xs: 2, sm: 3 },         // General section padding
    sectionMargin: { xs: 2, sm: 3 },          // Margin between sections
    pageMargin: { xs: 4, sm: 6 },             // Page-level margins
    
    // Icon spacing  
    iconGap: { xs: 0.5, sm: 0.75 },          // Gap next to icons
    
    // List spacing
    listItemGap: { xs: 1, sm: 2 },            // Gap between list items
    listSectionGap: { xs: 2, sm: 3 },         // Gap between list sections
  },

  // Touch-friendly minimum sizes (not spacing multipliers, but pixel values)
  minSizes: {
    touchTarget: 44,    // Minimum touch target size in pixels
  },
} as const;

// Type-safe access to spacing values
export type SpacingScale = keyof typeof spacing.responsive;
export type ComponentSpacing = keyof typeof spacing.component;

// Helper functions for common patterns
export const getResponsiveSpacing = (scale: SpacingScale) => spacing.responsive[scale];
export const getComponentSpacing = (component: ComponentSpacing) => spacing.component[component];

// Quick access to most common spacing patterns
export const commonSpacing = {
  // Most frequently used responsive patterns
  cardPadding: spacing.component.cardPadding,
  buttonGap: spacing.component.buttonGap,
  sectionGap: spacing.component.sectionMargin,
  iconGap: spacing.component.iconGap,
  
  // Static values for consistent usage
  none: spacing.none,
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
} as const;