# Component B: Dynamic Cards - Split Content

## Overview

The Dynamic Cards component is a powerful, interactive content showcase that combines image carousels with rich, structured content. It features Alpine.js interactivity, Swiper.js for image carousels, and custom Bard sets for enhanced content management.

## Features

### 🎠 Image Carousel
- **Swiper.js Integration**: Smooth, responsive image carousel with navigation
- **Auto-play**: Automatic slideshow with 5-second intervals
- **Navigation Controls**: Previous/next arrows and pagination dots
- **Hover Effects**: Subtle scale animations on image hover
- **Caption Support**: Optional image captions with gradient overlay

### 📝 Rich Content Rendering
- **Bard Field Integration**: Full Bard field support with custom styling
- **Custom Sets**: Three specialized content sets for enhanced functionality
- **Professional Typography**: Tailwind Typography (prose) classes for consistent text styling

### 🎯 Alpine.js Interactivity
- **Accordion Functionality**: Expandable/collapsible content sections
- **Smooth Transitions**: CSS transitions for all interactive elements
- **Accessibility**: ARIA attributes and keyboard navigation support

## Custom Bard Sets

### 1. Accordion Set
**Purpose**: Create expandable content sections
**Fields**:
- `title`: Accordion header text
- `content`: Markdown content for the expandable section

**Features**:
- Smooth open/close animations
- Rotating chevron icon
- Hover effects on the header

### 2. Icon List Set
**Purpose**: Display feature lists with icons
**Fields**:
- `title`: Section title (optional)
- `items`: Grid of list items with:
  - `icon`: Icon selection (check, star, lightning, heart, default)
  - `item_title`: Item title
  - `description`: Item description

**Features**:
- Multiple icon options
- Hover effects with lift animation
- Responsive grid layout

### 3. Feature Highlight Set
**Purpose**: Showcase key features with visual emphasis
**Fields**:
- `icon`: Icon selection (rocket, shield, zap, default)
- `title`: Feature title
- `description`: Feature description
- `features`: List of feature points
- `cta_text`: Call-to-action text
- `cta_url`: Call-to-action URL

**Features**:
- Gradient background
- Scale animation on hover
- Built-in feature list with checkmarks

## Usage

### 1. Adding to Page Builder
1. In the Control Panel, edit any page with the Page Builder
2. Add a new block and select "Dynamic Cards"
3. Fill in the required fields:
   - **Title**: Main heading for the section
   - **Description**: Brief description or subtitle
   - **Images**: Upload one or more images for the carousel
   - **Content**: Add rich content using the custom Bard sets
   - **CTA**: Optional call-to-action button

### 2. Content Structure
```yaml
blocks:
  -
    type: dynamic_cards
    title: "Interactive Product Showcase"
    description: "Experience our latest innovations"
    images:
      - "image1.jpg"
      - "image2.jpg"
    content:
      -
        type: set
        attrs:
          values:
            type: accordion
            title: "Product Features"
            content: "## Advanced Technology\n\nFeature details..."
      -
        type: set
        attrs:
          values:
            type: icon_list
            title: "Key Benefits"
            items:
              -
                icon: check
                item_title: "Easy Setup"
                description: "Get started in minutes"
    cta_text: "Get Started Today"
    cta_url: "/contact"
```

## Technical Implementation

### Dependencies
- **Alpine.js**: For interactive functionality
- **Swiper.js**: For image carousel
- **Tailwind CSS**: For styling and responsive design

### JavaScript Components
```javascript
// Alpine.js component for carousel
Alpine.data('dynamicCardCarousel', () => ({
    swiper: null,
    
    init() {
        this.swiper = new Swiper(this.$el.querySelector('.dynamic-card-swiper'), {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }
}));
```

### CSS Customization
The component includes custom CSS for:
- Swiper carousel styling
- Accordion animations
- Icon list hover effects
- Feature highlight transitions

## Demo Page

Visit `/dynamic-cards-demo` to see the component in action with sample content showcasing:
- Multiple images in carousel
- Accordion with markdown content
- Icon list with different icons
- Feature highlight with call-to-action

## Customization Options

### Styling
- Modify colors in `resources/css/site.css`
- Adjust spacing and typography using Tailwind classes
- Customize hover effects and transitions

### Functionality
- Change autoplay timing in the Alpine.js component
- Modify carousel settings (slides per view, navigation style)
- Add new icon options to the icon sets

### Content Sets
- Create additional Bard sets for specific content types
- Modify existing sets to match your design requirements
- Add new field types to existing sets

## Browser Support
- Modern browsers with ES6+ support
- Mobile-responsive design
- Touch-friendly carousel controls

## Performance
- Lazy loading for images
- Optimized CSS and JavaScript
- Minimal bundle size impact

## Accessibility
- ARIA attributes for screen readers
- Keyboard navigation support
- High contrast mode compatible
- Focus management for interactive elements
