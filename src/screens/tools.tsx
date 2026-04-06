import React, { useState, JSX } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path, G, Rect, Circle, Defs, Mask } from 'react-native-svg';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

const { width } = Dimensions.get('window');
import facebook from '../assets/images/facebook.png'
import instagram from '../assets/images/instagram.png'
import linkedin from '../assets/images/linkedin.png'

type Toolsprops = NativeStackScreenProps<RootStackParamList, 'Tools'>


// Types
interface Tool {
  name: string;
  img1: string;
  caption1: string;
  img2: string;
  caption2: string;
  description: string;
  url: string;
}

// SVG Icons
const CompressIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 512 512">
    <Path
      fill="#eb202a"
      d="M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31l-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24m112-64h112c21.4 0 32.1-25.9 17-41l-33-31l99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24m96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9l99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6zM183 71.1L152 104L52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9"
    />
  </Svg>
);

const LockIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 48 48">
    <Defs>
      <Mask id="lock">
        <G fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
          <Path
            fill="#fff"
            stroke="#fff"
            d="M10 44h28a2 2 0 0 0 2-2V14H30V4H10a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2"
          />
          <Path stroke="#fff" d="m30 4l10 10" />
          <Path fill="#000" stroke="#000" d="M17 27h14v8H17z" />
          <Path stroke="#000" d="M28 27v-4c0-1.657-1-4-4-4s-4 2.343-4 4v4" />
        </G>
      </Mask>
    </Defs>
    <Path fill="#36a4d6" d="M0 0h48v48H0z" mask="url(#lock)" />
  </Svg>
);

const SplitterIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 48 48">
    <G fill="none" stroke="#40f476" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      <Rect width="38" height="38" x="5" y="5" rx="3" />
      <Path d="M19 19c2 3 2 7 0 10m17-15L21 24l15 10" />
      <Circle cx="16" cy="16" r="4" />
      <Circle cx="16" cy="32" r="4" />
    </G>
  </Svg>
);

const ImageToPdfIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 32 32">
    <Path
      fill="#fa8f24"
      d="M27.425 6.09h-1.52V4.57h-1.52V3.04h-1.53V1.52h-1.52V0H3.045v32h25.91V7.62h-1.53Zm0 24.38H4.575V1.52h15.23v7.62h7.62Z"
    />
    <Path
      fill="#fa8f24"
      d="M19.805 19.81v-1.53h-1.52v1.53h-9.14v-1.53h-1.53V7.62h-1.52v16.76h1.52v-3.05h16.77v3.05h1.52V10.66h-1.52v7.62h-1.53v1.53z"
    />
  </Svg>
);

const MergerIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path
      fill="#40f476"
      d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H8V4h12zm-7-1h2v-4h4V9h-4V5h-2v4H9v2h4z"
    />
  </Svg>
);

const RotatorIcon = () => (
  <Svg width="27" height="27" viewBox="0 0 24 24">
    <Path
      fill="#40f476"
      d="M12 3a9 9 0 0 1 9 9a9 9 0 0 1-4.873 8.001L18 20a1 1 0 0 1 .117 1.993L18 22h-4a1 1 0 0 1-.993-.883L13 21v-4a1 1 0 0 1 1.993-.117L15 17l.001 1.327A7.01 7.01 0 0 0 19 12a7 7 0 1 0-14 0a1 1 0 1 1-2 0a9 9 0 0 1 9-9m0 6a3 3 0 1 1 0 6a3 3 0 0 1 0-6m0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
    />
  </Svg>
);

const ReordererIcon = () => (
  <Svg width="27" height="27" viewBox="0 0 20 20">
    <Path fill="#40f476" d="M13 0a2 2 0 0 1 2 2H6a2 2 0 0 0-2 2v12a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
    <Path
      fill="#40f476"
      d="M7 20a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2zm6.5-3.5l.41-1.09L15 15l-1.09-.41l-.41-1.09l-.41 1.09L12 15l1.09.41zm-2.982-.949l.952-2.561l2.53-.964l-2.53-.964l-.952-2.562l-.952 2.562l-2.53.964l2.53.964zM14 10.5l.547-1.453L16 8.5l-1.453-.547L14 6.5l-.547 1.453L12 8.5l1.453.547z"
    />
  </Svg>
);

const WatermarkIcon = () => (
  <Svg width="26" height="26" viewBox="0 0 16 16">
    <Path
      fill="#e739b0"
      fillRule="evenodd"
      d="M3.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .743.437L8 12.572l4.257 2.365A.5.5 0 0 0 13 14.5v-13a.5.5 0 0 0-.5-.5zM5 4h6V3H5z"
      clipRule="evenodd"
    />
  </Svg>
);

const TextExtractorIcon = () => (
  <Svg width="26" height="26" viewBox="0 0 256 256">
    <Path
      fill="#e739b0"
      d="m216.49 79.52l-56-56A12 12 0 0 0 152 20H56a20 20 0 0 0-20 20v176a20 20 0 0 0 20 20h144a20 20 0 0 0 20-20V88a12 12 0 0 0-3.51-8.48M160 57l23 23h-23ZM60 212V44h76v48a12 12 0 0 0 12 12h48v108Zm112-80a12 12 0 0 1-12 12H96a12 12 0 0 1 0-24h64a12 12 0 0 1 12 12m0 40a12 12 0 0 1-12 12H96a12 12 0 0 1 0-24h64a12 12 0 0 1 12 12"
    />
  </Svg>
);

const UnlockIcon = () => (
  <Svg width="27" height="27" viewBox="0 0 16 16">
    <G fill="#36a4d6">
      <Path d="M7 7a1 1 0 0 1 2 0v1H7zM6 9.3c0-.042.02-.107.105-.175A.64.64 0 0 1 6.5 9h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.64.64 0 0 1 9.5 12h-3a.64.64 0 0 1-.395-.125C6.02 11.807 6 11.742 6 11.7z" />
      <Path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0" />
    </G>
  </Svg>
);

const HamburgerIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24">
    <Path fill="white" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
  </Svg>
);

const ConvertIcon = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24">
    <Path
      fill="#666"
      d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"
    />
  </Svg>
);

const ToolsScreen = ({ navigation }: Toolsprops) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const tools: Tool[] = [
    {
      name: 'Images to Pdf',
      img1: 'https://cdn3.iconfinder.com/data/icons/file-formats-part-1/1000/PNG-512.png',
      caption1: 'Images',
      img2: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption2: 'Pdf',
      description: 'Quickly merge multiple images into a single PDF while keeping their quality and layout intact—ideal for sharing or archiving.',
      url: 'Images%20to%20Pdf',
    },
    {
      name: 'Pdf Merger',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Original Pdf',
      img2: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption2: 'Merged Pdf',
      description: 'Easily combine multiple PDF files into a single, well-structured document while preserving layout and quality.',
      url: 'Pdf%20Merger',
    },
    {
      name: 'Pdf Splitter',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Original Pdf',
      img2: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption2: 'Splitted Pdf',
      description: 'Split large PDFs into smaller files or extract specific pages with full control and fast processing.',
      url: 'Pdf%20Splitter',
    },
    {
      name: 'Pdf Compresser',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Original Pdf',
      img2: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption2: 'Compressed Pdf',
      description: 'Reduce your PDF file size without losing quality—perfect for faster uploads, sharing, and saving storage space.',
      url: 'Pdf%20Compresser',
    },
    {
      name: 'Pdf to PNG',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Original Pdf',
      img2: 'https://st2.depositphotos.com/47577860/46963/v/600/depositphotos_469635890-stock-illustration-file-format-png-icon.jpg',
      caption2: 'PNGs',
      description: 'Turn PDFs into crystal-clear PNG images, ideal for designs, transparency, and digital use.',
      url: 'Pdf%20to%20PNG',
    },
    {
      name: 'Pdf to JPG',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Original Pdf',
      img2: 'https://st.depositphotos.com/57803962/56363/v/600/depositphotos_563637420-stock-illustration-file-format-icon-vector-illustration.jpg',
      caption2: 'JPGs',
      description: 'Convert PDF pages to sharp, high-resolution JPG images suitable for sharing, previews, or web use.',
      url: 'Pdf%20to%20JPG',
    },
    {
      name: 'Pdf to TIFF',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Original Pdf',
      img2: 'https://st4.depositphotos.com/1000507/23793/v/600/depositphotos_237931072-stock-illustration-tagged-image-file-format.jpg',
      caption2: 'TIFFs',
      description: 'Generate high-quality TIFF images from your PDFs, perfect for printing, scanning, or archiving.',
      url: 'Pdf%20to%20TIFF',
    },
    // {
    //   name: 'Pdf Encryptor',
    //   img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
    //   caption1: 'Original Pdf',
    //   img2: 'https://st2.depositphotos.com/42596756/44437/v/600/depositphotos_444376980-stock-illustration-file-folders-vector-icon.jpg',
    //   caption2: 'Locked Pdf',
    //   description: 'Add strong password protection to your PDFs to prevent unauthorized access, copying, or editing.',
    //   url: 'Pdf%20Encryptor',
    // },
    // {
    //   name: 'Pdf Decryptor',
    //   img1: 'https://st2.depositphotos.com/42596756/44437/v/600/depositphotos_444376980-stock-illustration-file-folders-vector-icon.jpg',
    //   caption1: 'Locked Pdf',
    //   img2: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
    //   caption2: 'Unlocked Pdf',
    //   description: 'Remove passwords and restrictions to enjoy hassle-free access and editing. Say goodbye to locked content — your files, your control.',
    //   url: 'Pdf%20Decryptor',
    // },
    {
      name: 'Pdf Rotator',
      img1: 'https://images.openai.com/thumbnails/url/fSAyMHicu1mSUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw4KCM_LKo93NDH0zcjKc8-PtDAqN3ezTHJLLSz0TvV38630SM81c_d2NDfJ0_W2DAhwscwv9g8qdtTNDVQrBgAKHSj5',
      caption1: 'Input Pdf',
      img2: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption2: 'Rotated Pdf',
      description: 'Sick of your pdf pages rotated unusually use the rotate tool to fix the alignment within seconds',
      url: 'Pdf%20Rotator',
    },
    {
      name: 'Text Extractor',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Input Pdf',
      img2: 'https://st2.depositphotos.com/1431107/11791/v/600/depositphotos_117915872-stock-illustration-text-file-icon.jpg',
      caption2: 'Text File',
      description: 'Extract clean, editable text from any PDF with ease. Perfect for copying, searching, or repurposing content without the formatting mess.',
      url: 'Text%20Extractor',
    },
    {
      name: 'Pdf Watermarker',
      img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
      caption1: 'Input Pdf',
      img2: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/stamp-approved-icon-download-in-svg-png-gif-file-formats--mark-seal-verified-accept-confirm-approve-document-pack-files-folders-icons-12490322.png?f=webp&w=512',
      caption2: 'Watermarked Pdf',
      description: 'Add custom text or image watermarks to your PDF files and safeguard your documents with style and clarity.',
      url: 'Pdf%20Watermarker',
    },
    // {
    //   name: 'Pdf Reorderer',
    //   img1: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
    //   caption1: 'Input Pdf',
    //   img2: 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg',
    //   caption2: 'Reordered Pdf',
    //   description: 'Drag and drop to rearrange pages and create the perfect flow. Your document, your rules — in just seconds.',
    //   url: 'Pdf%20Reorderer',
    // },
  ];

  const popularTools = [
    { name: 'Pdf Compresser', icon: CompressIcon },
    // { name: 'Pdf Encryptor', icon: LockIcon },
    { name: 'Pdf Splitter', icon: SplitterIcon },
    { name: 'Images to Pdf', icon: ImageToPdfIcon },
  ];

  const imageTools = [
    { name: 'Images to Pdf', icon: ImageToPdfIcon },
    { name: 'Pdf to PNG', icon: ImageToPdfIcon },
    { name: 'Pdf to JPG', icon: ImageToPdfIcon },
    { name: 'Pdf to TIFF', icon: ImageToPdfIcon },
  ];

  const organizerTools = [
    { name: 'Pdf Merger', icon: MergerIcon },
    { name: 'Pdf Splitter', icon: SplitterIcon },
    // { name: 'Pdf Reorderer', icon: ReordererIcon },
    { name: 'Pdf Rotator', icon: RotatorIcon },
  ];

  const optimizationTools = [{ name: 'Pdf Compresser', icon: CompressIcon }];

  // const securityTools = [
  //   { name: 'Pdf Encryptor', icon: LockIcon },
  //   { name: 'Pdf Decryptor', icon: UnlockIcon },
  // ];

  const otherTools = [
    { name: 'Pdf Watermarker', icon: WatermarkIcon },
    { name: 'Text Extractor', icon: TextExtractorIcon },
  ];

  const openTool = (toolName: string, url: string): void => {
    const tool = tools.find(t => t.name == toolName);
    if (tool) {
      navigation.push('Tool', tool)
    }

    // const baseUrl = 'https://pdf-toolkit-0z2m.onrender.com/tools/';
    // Linking.openURL(`${baseUrl}${url}`);
  };

  const handleToolPress = (tool: Tool): void => {
    navigation.push('Tool', tool)
    // const baseUrl = 'https://pdf-toolkit-0z2m.onrender.com/tools/';
    // Linking.openURL(`${baseUrl}${tool.url}?${params.toString()}`);
  };

  const renderToolItem = (tool: { name: string; icon: React.FC }): JSX.Element => (
    <TouchableOpacity
      key={tool.name}
      onPress={() => openTool(tool.name, tool.name.replace(/\s+/g, '%20'))}
      style={styles.toolItem}
    >
      <tool.icon />
      <Text style={styles.toolText}>{tool.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>PdfxFools</Text>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <HamburgerIcon />
        </TouchableOpacity>
      </View>

      {/* Hamburger Menu */}
      {menuOpen && (
        <ScrollView style={styles.menu}>
          <View style={styles.menuContent}>
            {/* Popular Tools */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Popular Tools</Text>
              {popularTools.map(renderToolItem)}
            </View>

            {/* Image Operations */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Image operations</Text>
              {imageTools.map(renderToolItem)}
            </View>

            {/* PDF Organizer */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Pdf Organizer</Text>
              {organizerTools.map(renderToolItem)}
            </View>

            {/* PDF Optimization */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Pdf Optimization</Text>
              {optimizationTools.map(renderToolItem)}
            </View>

            {/* PDF Security */}
            {/* <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Pdf Security</Text>
              {securityTools.map(renderToolItem)}
            </View> */}

            {/* Others */}
            <View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Others</Text>
              {otherTools.map(renderToolItem)}
            </View>

            {/* Footer in Menu */}
            <View style={styles.menuFooter}>
              <Text style={styles.menuFooterTitle}>PdfxFools</Text>
              <Text style={styles.menuFooterSubtitle}>
                Your one stop guide to all reliable Pdf tools
              </Text>
              <View style={styles.menuLinks}>
                <TouchableOpacity onPress={navigation.popToTop}><Text style={styles.menuLink}>Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Tools')}><Text style={styles.menuLink}>Tools</Text></TouchableOpacity>
                <Text style={styles.menuLink}>Contact</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
        {tools.map((tool, index) => (
          <View key={index} style={styles.toolCard}>
            <View style={styles.toolHeader}>
              <View style={styles.toolFigure}>
                <Image source={{ uri: tool.img1 }} style={styles.toolImage} />
                <Text style={styles.toolCaption}>{tool.caption1}</Text>
              </View>

              <ConvertIcon />

              <View style={styles.toolFigure}>
                <Image source={{ uri: tool.img2 }} style={styles.toolImage} />
                <Text style={styles.toolCaption}>{tool.caption2}</Text>
              </View>
            </View>

            <View style={styles.toolInfo}>
              <TouchableOpacity
                style={styles.toolButton}
                onPress={() => handleToolPress(tool)}
              >
                <Text style={styles.toolButtonText}>{tool.name}</Text>
              </TouchableOpacity>
              <Text style={styles.toolDescription}>{tool.description}</Text>
            </View>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Consumer Policy</Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Terms')}>Terms & Conditions</Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Privacy')}>Privacy Policy</Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Contact')}>Contact</Text>
          </View>
          <View style={styles.footerDivider} />
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Socials</Text>
            <View style={styles.footerLink}>
              <Image style={styles.socials} source={facebook} />
              <Image style={styles.socials} source={instagram} />
              <Image style={styles.socials} source={linkedin} />
            </View>
          </View>

          <View style={styles.footerDivider} />
          <Text style={styles.copyright}>@PdfxFools 2025 All Rights Reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbeb',
  },
  navbar: {
    height: 48,
    backgroundColor: '#f97316',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  menu: {
    position: 'absolute',
    top: 48,
    right: 0,
    width: 260,
    height: '95%',
    backgroundColor: '#fffbeb',
    zIndex: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  menuContent: {
    padding: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  menuSection: {
    marginBottom: 16,
    // borderWidth: 2,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  toolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  toolText: {
    marginLeft: 2,
    fontSize: 12,
  },
  menuFooter: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
    marginTop: 100,
  },
  menuFooterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  menuFooterSubtitle: {
    fontSize: 12,
    marginVertical: 4,
  },
  menuLinks: {
    flexDirection: 'row',
    gap: 8,
  },
  menuLink: {
    fontSize: 12,
    color: '#f97316',
  },
  main: {
    flex: 1,
  },
  mainContent: {
    padding: 16,
    alignItems: 'center',
    gap: 20,
  },
  toolCard: {
    width: width > 768 ? width * 0.33 : width * 0.9,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'space-between',
  },
  toolHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
    minHeight: 120,
  },
  toolFigure: {
    width: 80,
    alignItems: 'center',
  },
  toolImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  toolCaption: {
    fontSize: 12,
    // backgroundColor: '#ea0f0fff',
    textAlign: 'center',
    marginTop: 4,
    width: 95,
  },
  toolInfo: {
    gap: 8,
  },
  toolButton: {
    backgroundColor: '#f97316',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toolButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toolDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    width: width,
    backgroundColor: '#f97316',
    padding: 16,
    marginBottom: -16,
  },
  footerSection: {
    marginBottom: 1,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 8,
    color: '#ffffff'
  },
  footerLink: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    color: '#ffffff'
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginVertical: 8,
  },
  socials: {
    width: 20,
    height: 20
  },
  copyright: {
    fontSize: 14,
    marginTop: 8,
    color: '#ffffff'
  },
});

export default ToolsScreen;