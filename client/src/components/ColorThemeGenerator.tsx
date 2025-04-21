import React, { useState, useEffect, useCallback } from 'react';
import { HexColorPicker } from "react-colorful";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { 
  RefreshCw, 
  Download, 
  Copy, 
  CheckCircle, 
  Palette, 
  SunMoon,
  Sparkles,
  Heart
} from 'lucide-react';
import { debounce, getContrastColor } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Color contrast checking functions
const hexToRgb = (hex: string): [number, number, number] => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return [r, g, b];
};

const getLuminance = (rgb: [number, number, number]): number => {
  const [r, g, b] = rgb.map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const getContrastRatio = (color1: string, color2: string): number => {
  const luminance1 = getLuminance(hexToRgb(color1));
  const luminance2 = getLuminance(hexToRgb(color2));
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Generate a complementary color
const getComplementaryColor = (hex: string): string => {
  const [r, g, b] = hexToRgb(hex);
  
  // Invert the colors
  const newR = (255 - r).toString(16).padStart(2, '0');
  const newG = (255 - g).toString(16).padStart(2, '0');
  const newB = (255 - b).toString(16).padStart(2, '0');
  
  return `#${newR}${newG}${newB}`;
};

// Generate an analogous color
const getAnalogousColor = (hex: string, angle: number): string => {
  // Convert hex to HSL
  const [r, g, b] = hexToRgb(hex);
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    if (max === r1) h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
    else if (max === g1) h = (b1 - r1) / d + 2;
    else if (max === b1) h = (r1 - g1) / d + 4;
    
    h /= 6;
  }
  
  // Adjust hue by the angle (in degrees)
  h = (h * 360 + angle) % 360 / 360;
  
  // Convert back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let r2, g2, b2;
  if (s === 0) {
    r2 = g2 = b2 = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r2 = hue2rgb(p, q, h + 1/3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1/3);
  }
  
  // Convert back to hex
  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
};

// Generate shades and tints
const generateShades = (hex: string, count: number): string[] => {
  const [r, g, b] = hexToRgb(hex);
  const shades: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const factor = 1 - (i + 1) / (count + 1);
    const newR = Math.floor(r * factor);
    const newG = Math.floor(g * factor);
    const newB = Math.floor(b * factor);
    
    const newHex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    shades.push(newHex);
  }
  
  return shades;
};

const generateTints = (hex: string, count: number): string[] => {
  const [r, g, b] = hexToRgb(hex);
  const tints: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const factor = (i + 1) / (count + 1);
    const newR = Math.floor(r + (255 - r) * factor);
    const newG = Math.floor(g + (255 - g) * factor);
    const newB = Math.floor(b + (255 - b) * factor);
    
    const newHex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    tints.push(newHex);
  }
  
  return tints;
};

// Generate a random hex color
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate a palette based on the selected mode
const generatePalette = (primary: string, mode: string): Record<string, string> => {
  const palette: Record<string, string> = {
    primary
  };
  
  switch (mode) {
    case 'monochromatic':
      // Generate shades and tints
      palette.dark = generateShades(primary, 1)[0];
      palette.light = generateTints(primary, 1)[0];
      break;
    case 'complementary':
      // Add a complementary color
      palette.secondary = getComplementaryColor(primary);
      break;
    case 'analogous':
      // Add analogous colors
      palette.secondary = getAnalogousColor(primary, 30);
      palette.accent = getAnalogousColor(primary, -30);
      break;
    case 'triadic':
      // Add triadic colors (120° apart)
      palette.secondary = getAnalogousColor(primary, 120);
      palette.accent = getAnalogousColor(primary, 240);
      break;
    default:
      break;
  }
  
  return palette;
};

interface ColorThemeGeneratorProps {
  onThemeChange?: (theme: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  }) => void;
}

const ColorThemeGenerator: React.FC<ColorThemeGeneratorProps> = ({ onThemeChange }) => {
  const { toast } = useToast();
  const [themeName, setThemeName] = useState('My Custom Theme');
  const [primaryColor, setPrimaryColor] = useState('#7C3AED');  // Default purple
  const [secondaryColor, setSecondaryColor] = useState('#3B82F6');  // Default blue
  const [accentColor, setAccentColor] = useState('#10B981');  // Default green
  const [colorMode, setColorMode] = useState('analogous');
  const [contrastRatio, setContrastRatio] = useState<number>(0);
  const [variantStyle, setVariantStyle] = useState('modern');
  const [brightness, setBrightness] = useState([50]);
  const [saturation, setSaturation] = useState([70]);
  const [currentTab, setCurrentTab] = useState("picker");
  const [isCopied, setIsCopied] = useState(false);
  const [savedThemes, setSavedThemes] = useState<Array<{
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  }>>([]);
  
  // Auto-update related colors when primary changes or mode changes
  useEffect(() => {
    const palette = generatePalette(primaryColor, colorMode);
    
    if (palette.secondary) {
      setSecondaryColor(palette.secondary);
    }
    
    if (palette.accent) {
      setAccentColor(palette.accent);
    }
    
    // Check contrast ratio with white and black
    const contrastWithWhite = getContrastRatio(primaryColor, '#FFFFFF');
    const contrastWithBlack = getContrastRatio(primaryColor, '#000000');
    setContrastRatio(Math.max(contrastWithWhite, contrastWithBlack));
    
  }, [primaryColor, colorMode]);
  
  // Load saved themes from localStorage on component mount
  useEffect(() => {
    const storedThemes = localStorage.getItem('savedColorThemes');
    if (storedThemes) {
      setSavedThemes(JSON.parse(storedThemes));
    }
  }, []);
  
  // Notify parent component when the theme changes
  useEffect(() => {
    if (onThemeChange) {
      onThemeChange({
        name: themeName,
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor
      });
    }
  }, [themeName, primaryColor, secondaryColor, accentColor, onThemeChange]);
  
  // Throttle color updates for better performance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetPrimaryColor = useCallback(
    debounce((color: string) => {
      setPrimaryColor(color);
    }, 100),
    []
  );
  
  // Generate a random theme
  const generateRandomTheme = () => {
    const newPrimary = getRandomColor();
    setPrimaryColor(newPrimary);
    
    // Secondary and accent will be updated through the useEffect
  };
  
  // Get complementary text color for buttons
  const getTextColor = (bgColor: string) => {
    return getContrastColor(bgColor);
  };
  
  // Save current theme
  const saveTheme = () => {
    const newTheme = {
      name: themeName,
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor
    };
    
    const updatedThemes = [...savedThemes, newTheme];
    setSavedThemes(updatedThemes);
    
    // Save to localStorage
    localStorage.setItem('savedColorThemes', JSON.stringify(updatedThemes));
    
    toast({
      title: "Theme Saved",
      description: `"${themeName}" has been added to your saved themes.`,
    });
  };
  
  // Load a saved theme
  const loadTheme = (theme: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  }) => {
    setThemeName(theme.name);
    setPrimaryColor(theme.primary);
    setSecondaryColor(theme.secondary);
    setAccentColor(theme.accent);
    
    toast({
      title: "Theme Loaded",
      description: `"${theme.name}" has been applied.`,
    });
  };
  
  // Delete a saved theme
  const deleteTheme = (index: number) => {
    const updatedThemes = [...savedThemes];
    updatedThemes.splice(index, 1);
    setSavedThemes(updatedThemes);
    
    // Update localStorage
    localStorage.setItem('savedColorThemes', JSON.stringify(updatedThemes));
    
    toast({
      title: "Theme Deleted",
      description: "The theme has been removed from your saved themes.",
    });
  };
  
  // Copy theme CSS
  const copyThemeCSS = () => {
    const cssText = `:root {
  --color-primary: ${primaryColor};
  --color-secondary: ${secondaryColor};
  --color-accent: ${accentColor};
  
  /* Light mode shades */
  --color-primary-50: ${generateTints(primaryColor, 5)[4]};
  --color-primary-100: ${generateTints(primaryColor, 5)[3]};
  --color-primary-200: ${generateTints(primaryColor, 5)[2]};
  --color-primary-300: ${generateTints(primaryColor, 5)[1]};
  --color-primary-400: ${generateTints(primaryColor, 5)[0]};
  --color-primary-500: ${primaryColor};
  --color-primary-600: ${generateShades(primaryColor, 5)[0]};
  --color-primary-700: ${generateShades(primaryColor, 5)[1]};
  --color-primary-800: ${generateShades(primaryColor, 5)[2]};
  --color-primary-900: ${generateShades(primaryColor, 5)[3]};
  --color-primary-950: ${generateShades(primaryColor, 5)[4]};
  
  /* Secondary and accent full ranges */
  --color-secondary-500: ${secondaryColor};
  --color-accent-500: ${accentColor};
}`;

    navigator.clipboard.writeText(cssText);
    setIsCopied(true);
    
    toast({
      title: "CSS Copied!",
      description: "CSS variables have been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  // Download theme as CSS file
  const downloadThemeCSS = () => {
    const cssText = `:root {
  --color-primary: ${primaryColor};
  --color-secondary: ${secondaryColor};
  --color-accent: ${accentColor};
  
  /* Light mode shades */
  --color-primary-50: ${generateTints(primaryColor, 5)[4]};
  --color-primary-100: ${generateTints(primaryColor, 5)[3]};
  --color-primary-200: ${generateTints(primaryColor, 5)[2]};
  --color-primary-300: ${generateTints(primaryColor, 5)[1]};
  --color-primary-400: ${generateTints(primaryColor, 5)[0]};
  --color-primary-500: ${primaryColor};
  --color-primary-600: ${generateShades(primaryColor, 5)[0]};
  --color-primary-700: ${generateShades(primaryColor, 5)[1]};
  --color-primary-800: ${generateShades(primaryColor, 5)[2]};
  --color-primary-900: ${generateShades(primaryColor, 5)[3]};
  --color-primary-950: ${generateShades(primaryColor, 5)[4]};
  
  /* Secondary and accent full ranges */
  --color-secondary-500: ${secondaryColor};
  --color-accent-500: ${accentColor};
}`;
    
    const blob = new Blob([cssText], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeName.toLowerCase().replace(/\s+/g, '-')}.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Theme Downloaded",
      description: "Your theme CSS file has been downloaded.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Theme Generator</CardTitle>
          <CardDescription>Create custom color themes for your application</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="picker" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="picker" className="flex-1">Color Picker</TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">Theme Preview</TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">Saved Themes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="picker">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="themeName">Theme Name</Label>
                    <Input 
                      id="themeName"
                      value={themeName}
                      onChange={(e) => setThemeName(e.target.value)}
                      placeholder="My Custom Theme"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="relative">
                      <HexColorPicker 
                        color={primaryColor} 
                        onChange={debouncedSetPrimaryColor} 
                        className="w-full"
                      />
                      <div className="mt-2 flex items-center space-x-2">
                        <div 
                          className="h-8 w-8 rounded-md border"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <Input 
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={generateRandomTheme}
                    className="w-full"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Random
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Harmony</Label>
                    <RadioGroup value={colorMode} onValueChange={setColorMode}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monochromatic" id="monochromatic" />
                        <Label htmlFor="monochromatic">Monochromatic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="complementary" id="complementary" />
                        <Label htmlFor="complementary">Complementary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="analogous" id="analogous" />
                        <Label htmlFor="analogous">Analogous</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="triadic" id="triadic" />
                        <Label htmlFor="triadic">Triadic</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Style Variant</Label>
                    <RadioGroup value={variantStyle} onValueChange={setVariantStyle}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="modern" id="modern" />
                        <Label htmlFor="modern">Modern & Clean</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vibrant" id="vibrant" />
                        <Label htmlFor="vibrant">Vibrant & Bold</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="subtle" id="subtle" />
                        <Label htmlFor="subtle">Subtle & Elegant</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="corporate" id="corporate" />
                        <Label htmlFor="corporate">Corporate & Professional</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Brightness: {brightness}%</Label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={100}
                      step={1}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Saturation: {saturation}%</Label>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Generated Color Palette</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="h-8 w-8 rounded-md border"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Primary</div>
                          <div className="text-xs text-muted-foreground">{primaryColor}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div 
                          className="h-8 w-8 rounded-md border"
                          style={{ backgroundColor: secondaryColor }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Secondary</div>
                          <div className="text-xs text-muted-foreground">{secondaryColor}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div 
                          className="h-8 w-8 rounded-md border"
                          style={{ backgroundColor: accentColor }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Accent</div>
                          <div className="text-xs text-muted-foreground">{accentColor}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label>Accessibility</Label>
                    <div className="mt-2">
                      <div className="text-sm mb-1">Contrast Ratio: {contrastRatio.toFixed(2)}:1</div>
                      <div className={`text-sm ${
                        contrastRatio >= 4.5 ? 'text-green-500' : contrastRatio >= 3 ? 'text-orange-500' : 'text-red-500'
                      }`}>
                        {contrastRatio >= 4.5 
                          ? '✓ AA Compliant (Good contrast)' 
                          : contrastRatio >= 3 
                            ? '⚠️ Borderline (Improve if possible)' 
                            : '✗ Not Compliant (Poor contrast)'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button 
                      onClick={saveTheme} 
                      className="w-full"
                      style={{ 
                        backgroundColor: primaryColor, 
                        color: getTextColor(primaryColor) 
                      }}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Save Theme
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        onClick={copyThemeCSS}
                      >
                        {isCopied ? (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <Copy className="mr-2 h-4 w-4" />
                        )}
                        Copy CSS
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={downloadThemeCSS}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {/* Color scales */}
                  <div className="lg:col-span-3 space-y-4">
                    <Label>Primary Color Scale</Label>
                    <div className="grid grid-cols-11 h-16 overflow-hidden rounded-md">
                      {[...generateTints(primaryColor, 5).reverse(), primaryColor, ...generateShades(primaryColor, 5)].map((color, index) => (
                        <div 
                          key={index} 
                          className="flex items-end justify-center p-1"
                          style={{ backgroundColor: color, color: getContrastColor(color) }}
                        >
                          <div className="text-xs font-mono">{index * 100}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Secondary Color</Label>
                        <div className="grid grid-cols-5 h-12 overflow-hidden rounded-md">
                          {[...generateTints(secondaryColor, 2), secondaryColor, ...generateShades(secondaryColor, 2)].map((color, index) => (
                            <div 
                              key={index} 
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <div className="grid grid-cols-5 h-12 overflow-hidden rounded-md">
                          {[...generateTints(accentColor, 2), accentColor, ...generateShades(accentColor, 2)].map((color, index) => (
                            <div 
                              key={index} 
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Component examples */}
                  <div className="lg:col-span-2 space-y-4">
                    <Label>UI Components Preview</Label>
                    <div 
                      className="p-4 rounded-md border space-y-4"
                      style={{ background: generateTints(primaryColor, 5)[4] }}
                    >
                      <div className="space-y-2">
                        <Label style={{ color: generateShades(primaryColor, 5)[4] }}>
                          Input Label
                        </Label>
                        <Input placeholder="Input example" />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          style={{ 
                            backgroundColor: primaryColor, 
                            color: getTextColor(primaryColor) 
                          }}
                        >
                          Primary
                        </Button>
                        <Button
                          variant="outline"
                          style={{ 
                            borderColor: primaryColor,
                            color: primaryColor
                          }}
                        >
                          Outline
                        </Button>
                      </div>
                      
                      <div 
                        className="p-3 rounded-md"
                        style={{ 
                          backgroundColor: generateTints(primaryColor, 5)[3],
                          borderLeft: `4px solid ${primaryColor}`
                        }}
                      >
                        <div className="font-medium" style={{ color: generateShades(primaryColor, 5)[4] }}>
                          Alert Component
                        </div>
                        <div className="text-sm" style={{ color: generateShades(primaryColor, 5)[3] }}>
                          This is how alerts will look.
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <div 
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: primaryColor,
                            color: getTextColor(primaryColor)
                          }}
                        >
                          Tag 1
                        </div>
                        <div 
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: secondaryColor,
                            color: getTextColor(secondaryColor)
                          }}
                        >
                          Tag 2
                        </div>
                        <div 
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: accentColor,
                            color: getTextColor(accentColor)
                          }}
                        >
                          Tag 3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Dark/Light mode preview */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Light/Dark Mode Preview</Label>
                    <SunMoon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-md border overflow-hidden">
                      <div 
                        className="p-3 font-medium text-center"
                        style={{ 
                          backgroundColor: primaryColor,
                          color: getTextColor(primaryColor)
                        }}
                      >
                        Light Mode
                      </div>
                      <div className="p-4 space-y-3" style={{ backgroundColor: '#ffffff' }}>
                        <div style={{ color: '#000000' }}>Sample text in light mode</div>
                        <div className="flex space-x-2">
                          <Button
                            style={{ 
                              backgroundColor: primaryColor, 
                              color: getTextColor(primaryColor) 
                            }}
                            size="sm"
                          >
                            Button
                          </Button>
                          <Button
                            variant="outline"
                            style={{ 
                              borderColor: primaryColor,
                              color: primaryColor
                            }}
                            size="sm"
                          >
                            Outline
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border overflow-hidden">
                      <div 
                        className="p-3 font-medium text-center"
                        style={{ 
                          backgroundColor: primaryColor,
                          color: getTextColor(primaryColor)
                        }}
                      >
                        Dark Mode
                      </div>
                      <div className="p-4 space-y-3" style={{ backgroundColor: '#121212' }}>
                        <div style={{ color: '#ffffff' }}>Sample text in dark mode</div>
                        <div className="flex space-x-2">
                          <Button
                            style={{ 
                              backgroundColor: primaryColor, 
                              color: getTextColor(primaryColor) 
                            }}
                            size="sm"
                          >
                            Button
                          </Button>
                          <Button
                            variant="outline"
                            style={{ 
                              borderColor: primaryColor,
                              color: generateTints(primaryColor, 1)[0]
                            }}
                            size="sm"
                          >
                            Outline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="space-y-4">
                {savedThemes.length === 0 ? (
                  <div className="text-center py-12">
                    <Palette className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-lg font-medium">No Saved Themes</h3>
                    <p className="text-muted-foreground mt-1">
                      Your saved themes will appear here. Create and save a theme to get started.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentTab("picker")}
                      className="mt-4"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create New Theme
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedThemes.map((theme, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div
                          className="h-2"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{theme.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex space-x-2 mb-4">
                            <div
                              className="h-6 w-6 rounded-full border"
                              style={{ backgroundColor: theme.primary }}
                              title="Primary"
                            />
                            <div
                              className="h-6 w-6 rounded-full border"
                              style={{ backgroundColor: theme.secondary }}
                              title="Secondary"
                            />
                            <div
                              className="h-6 w-6 rounded-full border"
                              style={{ backgroundColor: theme.accent }}
                              title="Accent"
                            />
                          </div>
                          
                          <div className="grid grid-cols-5 h-8 overflow-hidden rounded-md">
                            {[
                              generateTints(theme.primary, 2)[1],
                              generateTints(theme.primary, 2)[0],
                              theme.primary,
                              generateShades(theme.primary, 2)[0],
                              generateShades(theme.primary, 2)[1]
                            ].map((color, idx) => (
                              <div
                                key={idx}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTheme(index)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              loadTheme(theme);
                              setCurrentTab("picker");
                            }}
                          >
                            Apply
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorThemeGenerator;