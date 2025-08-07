# 🎨 Logo Integration Guide

## Logo Files Setup

Your website now supports custom logos in both header and footer! Here's how to add your own logos:

### 📁 Logo File Locations

Place your logo files in the `/app/frontend/public/` directory:

1. **Header Logo**: `/app/frontend/public/logo.png`
   - Used in navigation header
   - Works on dark background
   - Recommended size: 280px × 52px (or proportional)
   - Formats: PNG (preferred), JPG, SVG

2. **Footer Logo**: `/app/frontend/public/logo-white.png`
   - Used in footer section  
   - Should be white/light colored for dark background
   - Recommended size: 200px × 40px (or proportional)
   - Formats: PNG (preferred), JPG, SVG

### 🎯 Logo Specifications

**Header Logo:**
- **Colors**: Any color scheme (your brand colors)
- **Background**: Transparent PNG recommended
- **Size**: Responsive (40px-52px height on different screens)
- **Max Width**: 280px
- **Hover Effect**: Slight scale animation

**Footer Logo:**
- **Colors**: White or light colors (for dark footer background)
- **Background**: Transparent PNG recommended  
- **Size**: Responsive (32px-40px height on different screens)
- **Max Width**: 200px
- **Hover Effect**: Brightness increase + subtle scale

### 📱 Responsive Behavior

Your logos will automatically adjust for different screen sizes:
- **Mobile**: Smaller, compact size
- **Tablet**: Medium size
- **Desktop**: Full size with hover effects

### 🔄 Fallback System

If logo images are not found, the website automatically falls back to styled text logos:
- **French**: "MécaniqueMobile" 
- **English**: "MobileMechanic"
- Maintains brand colors (red + black/white)

### 🛠️ How to Replace Logos

1. **Create your logo files** (PNG format recommended)
2. **Name them exactly**:
   - `logo.png` (for header)
   - `logo-white.png` (for footer)
3. **Upload to** `/app/frontend/public/` directory
4. **Refresh website** - logos will appear automatically!

### 💡 Pro Tips

- **Use PNG format** for best transparency support
- **Optimize file size** for faster loading
- **Test on both light and dark backgrounds**
- **Ensure white version is clearly visible on black footer**
- **Keep aspect ratio consistent** between header and footer versions

### 🎨 Brand Integration

The logo system works seamlessly with your bilingual site:
- **Alt text** changes with language (FR/EN)
- **Responsive sizing** maintains professional appearance
- **Hover animations** add premium feel
- **Fallback text** preserves branding if images fail to load

Your logos will now be prominently displayed and help establish your mobile mechanic brand across Montreal, Laval, and Rive Sud!