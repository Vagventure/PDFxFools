import React, { useState, JSX, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import Svg, { Path, G, Rect, Circle, Defs, Mask } from 'react-native-svg';
import { DocumentPickerResponse, pick } from '@react-native-documents/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import { Buffer } from 'buffer';

const { width } = Dimensions.get('window');
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import convert from '../assets/images/convert.png'
import { Picker } from '@react-native-picker/picker';
import convertr from '../assets/images/convert r.png'
import convertg from '../assets/images/convert g.png'

const normalizeUri = async (uri: string, name: string) => {
  if (uri.startsWith('file://')) {
    return uri;
  }

  const destPath = `${RNFS.TemporaryDirectoryPath}/${name || 'input.pdf'}`;
  await RNFS.copyFile(uri, destPath);
  return `file://${destPath}`;
};

// Types
interface ToolScreenProps {
  route?: {
    params: {
      name: string;
      img1: string;
      caption1: string;
      img2: string;
      caption2: string;
      description: string;
    };
  };
}

interface RecommendedTool {
  name: string;
  icon: React.FC;
  color: string;
  bgColor: string;
  description: string;
}

type TemplateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tool'>;

// SVG Icons (same as before)
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

const PdfToPngIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 26 26">
    <Path
      fill="#ffb86a"
      d="M1 0C.449 0 0 .449 0 1v16c0 .551.449 1 1 1h16c.551 0 1-.449 1-1V1c0-.551-.449-1-1-1zm1 2h14v12H2zm17 .906v2.031l1.813.313L19 15.75V17c0 1.104-.897 2-2 2H6.406l12.688 2.188a1 1 0 0 0 1.156-.813l2.688-15.781a1 1 0 0 0-.813-1.157zM9 3.937c-1.151 0-2.125.792-2.125 2.282c0 .974.434 1.952 1.031 2.562c.234.61-.164.842-.25.875c-1.206.436-2.625 1.245-2.625 2.031v1.282h7.938v-1.281c0-.81-1.422-1.614-2.688-2.032c-.058-.019-.417-.18-.187-.875c.595-.61 1.062-1.593 1.062-2.562c0-1.49-1.005-2.282-2.156-2.282m14.406 3.97l-.343 1.968l.718.156l-2.75 11.688l-.406-.094a1.95 1.95 0 0 1-1.719.531L5.063 19.781L4.78 20.97a1.023 1.023 0 0 0 .75 1.218l15.563 3.657a1.023 1.023 0 0 0 1.218-.75L25.938 9.53c.127-.536-.18-1.091-.718-1.219l-1.813-.406z"
    />
  </Svg>
);

const CompressIconLarge = () => (
  <Svg width="30" height="30" viewBox="0 0 48 48">
    <G fill="none">
      <Path
        fill="#ffa4a4"
        d="M9.646 2.191C12.525 1.855 17.181 1.5 24 1.5c1.985 0 3.787.03 5.415.081a1.5 1.5 0 0 1 .398.067c1.147.357 4.228 1.633 8.539 5.837c3.642 3.551 5.145 6.251 5.748 7.689c-.57.16-1.13.44-1.648.863c-1.104.899-2.71 2.412-3.809 3.654a6.47 6.47 0 0 0 0 8.618c1.098 1.243 2.705 2.756 3.809 3.655a4.5 4.5 0 0 0 1.872.92c-.142 3.29-.35 5.741-.55 7.5c-.33 2.899-2.532 5.088-5.42 5.425c-2.88.336-7.535.691-14.354.691s-11.475-.355-14.354-.691c-2.888-.337-5.09-2.526-5.42-5.425c-.2-1.759-.408-4.21-.55-7.5a4.5 4.5 0 0 0 1.872-.92c1.104-.9 2.71-2.412 3.809-3.655a6.47 6.47 0 0 0 0-8.618c-1.098-1.242-2.705-2.755-3.81-3.654a4.5 4.5 0 0 0-1.871-.92c.142-3.291.35-5.742.55-7.5c.33-2.9 2.532-5.089 5.42-5.426"
      />
      <Path
        fill="#eb202a"
        fillRule="evenodd"
        d="M16 16a2 2 0 1 1 0-4h8a2 2 0 1 1 0 4zm0 10a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4zm0 10a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);

const ToolJinjaScreen: React.FC<ToolScreenProps> = ({ route }) => {
  const name = route?.params?.name || 'Pdf Compresser';
  const img1 = route?.params?.img1 || 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg';
  const caption1 = route?.params?.caption1 || 'Original Pdf';
  const img2 = route?.params?.img2 || 'https://st5.depositphotos.com/20980838/64706/v/450/depositphotos_647060022-stock-illustration-pdf-icon-vector-illustration-flat.jpg';
  const caption2 = route?.params?.caption2 || 'Compressed Pdf';
  const description = route?.params?.description || 'Process your PDF files with ease';

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // const [finish, setFinish] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>([]);
  const [fields, setFields] = useState({
    value: "",
    start: "",
    end: "",
    password: "",
    rotate: "",
    watermark: ""

  })

  const [isBOnTop, setIsBOnTop] = useState(false)
  const [isROnTop, setIsROnTop] = useState(false)

  const convertRRef = useRef<Image>(null)
  const convertGRef = useRef<Image>(null)



  const navigation = useNavigation<TemplateScreenNavigationProp>();

  useEffect(() => {
    const state = navigation.getState();
    console.log('Current stack routes:', state.routes.map(r => r.name));
  }, [navigation]);


  // Instructions mapping
  const instructions: { [key: string]: string[] } = {
    'Pdf to PNG': [
      'Upload your PDF file.',
      'The document will be processed automatically.',
      'A ZIP archive will be prepared for download.',
      'Extract the ZIP file to access the PNG images.',
    ],
    'Pdf to JPG': [
      'Upload your PDF file.',
      'The document will be processed automatically.',
      'A ZIP archive will be prepared for download.',
      'Extract the ZIP file to access the JPG images.',
    ],
    'Pdf to TIFF': [
      'Upload your PDF file.',
      'The document will be processed automatically.',
      'A ZIP archive will be prepared for download.',
      'Extract the ZIP file to access the TIFF images.',
    ],
    'Images to Pdf': [
      'Upload your image files.',
      'They will be automatically converted into a PDF.',
      'The resulting PDF will be downloaded automatically.',
    ],
    'Pdf Merger': [
      'Select and upload multiple PDF files in one go (hold Ctrl or Shift).',
      'They will be automatically merged in the order you upload.',
      'The combined PDF will be downloaded automatically.',
    ],
    'Pdf Compresser': [
      'Upload your PDF file.',
      'Select the desired compression level.',
      'The file will be processed automatically.',
      'A download will be initiated upon completion.',
    ],
    'Pdf Splitter': [
      'Upload your PDF file.',
      'Specify the starting and ending pages.',
      'The file will be processed automatically.',
      'A download will begin once the split is complete.',
    ],
    'Pdf Encryptor': [
      'Upload your PDF file.',
      'Enter a password of your choice.',
      'The file will be encrypted automatically.',
      'The secured file will be downloaded immediately.',
    ],
    'Pdf Decryptor': [
      'Upload your encrypted PDF file.',
      'Enter the current password.',
      'The file will be decrypted automatically.',
      'The unlocked file will be downloaded immediately.',
    ],
    'Pdf Rotator': [
      'Upload your PDF file.',
      'Select the rotation angle.',
      'The file will be processed automatically.',
      'The rotated file will be downloaded upon completion.',
    ],
    'Text Extractor': [
      'Upload your PDF file.',
      'The text will be extracted automatically.',
      'A downloadable text file will be generated.',
      'Open the downloaded file to access the extracted content.',
    ],
    'Pdf Watermarker': [
      'Upload your PDF file.',
      'Enter a custom watermark text.',
      'The watermark will be applied automatically.',
      'The modified file will be ready for immediate download.',
    ],
    'Pdf Reorderer': [
      'Upload your PDF file.',
      'Wait for the pages to load in the reorder panel.',
      'Drag and drop pages to rearrange them as desired.',
      'Click the download button once rearrangement is complete.',
      'Your reordered PDF will be downloaded automatically.',
    ],
  };

  const recommendedTools: RecommendedTool[] = [
    // {
    //   name: 'Pdf Encryptor',
    //   icon: LockIcon,
    //   color: '#36a4d6',
    //   bgColor: '#dbeafe',
    //   description: 'Protect your PDF using advanced encryption. Keep it safe from unwanted access.',
    // },
    // {
    //   name: 'Pdf Reorderer',
    //   icon: ReordererIcon,
    //   color: '#40f476',
    //   bgColor: '#dcfce7',
    //   description: 'Easily reorder your PDF pages. Just drag, drop, and rearrange instantly.',
    // },
    {
      name: 'Images to Pdf',
      icon: ImageToPdfIcon,
      color: '#f97316',
      bgColor: '#fed7aa',
      description: 'Merge all your photos into a smooth PDF. Fast, clean, and unlimited.',
    },
    {
      name: 'Pdf Compresser',
      icon: CompressIconLarge,
      color: '#ff6b6b',
      bgColor: '#fecaca',
      description: 'Compress your PDF without sacrificing quality. Achieve smaller sizes effortlessly.',
    },
    {
      name: 'Pdf to PNG',
      icon: PdfToPngIcon,
      color: '#f97316',
      bgColor: '#fed7aa',
      description: 'Convert your PDF pages into crisp PNG images in one quick click.',
    },
    {
      name: 'Pdf Merger',
      icon: MergerIcon,
      color: '#40f476',
      bgColor: '#dcfce7',
      description: 'Combine multiple PDF documents into a single file in just a moment.',
    },
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

  const tools = [
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

  const renderExtraFields = (toolType: string): JSX.Element => {
    switch (toolType) {
      // 🧩 PDF SPLITTER
      case 'Pdf Splitter':
        return (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Start Page"
              keyboardType="numeric"
              onChangeText={(t) => setFields({ ...fields, start: t })}
            />
            <TextInput
              style={styles.input}
              placeholder="End Page"
              keyboardType="numeric"
              onChangeText={(t) => setFields({ ...fields, end: t })}
            />
          </View>
        );

      // 🔒 PDF ENCRYPTOR
      case 'Pdf Encryptor':
        return (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(t) => setFields({ ...fields, password: t })}
            />
          </View>
        );

      // 🔓 PDF DECRYPTOR
      case 'Pdf Decryptor':
        return (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              onChangeText={(t) => setFields({ ...fields, password: t })}
            />
          </View>
        );

      // 🗜️ PDF COMPRESSER
      case 'Pdf Compresser':
        return (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <View style={styles.pickerWrapper}>
              <Picker
                style={{ width: 250 }}
                dropdownIconColor='#ff982aff'
                onValueChange={(value) => setFields({ ...fields, value: value as string })}
              >
                <Picker.Item style={styles.pickerVal} label="High Quality (Printing)" value="/prepress" />
                <Picker.Item style={styles.pickerVal} label="Standard (Most Uses)" value="/default" />
                <Picker.Item style={styles.pickerVal} label="Small File (Fastest)" value="/ebook" />
                <Picker.Item style={styles.pickerVal} label="Ultra Compressed (Screen Only)" value="/screen" />
              </Picker>
            </View>
          </View>
        );

      // 🔁 PDF ROTATOR
      case 'Pdf Rotator':
        return (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <View style={styles.pickerWrapper}>
              <Picker
                style={{ width: 250 }}
                dropdownIconColor='#ff982aff'
                onValueChange={(value) => setFields({ ...fields, rotate: value as string })}
              >
                <Picker.Item style={styles.pickerVal} label="Rotate 90°" value="90" />
                <Picker.Item style={styles.pickerVal} label="Rotate 180°" value="180" />
                <Picker.Item style={styles.pickerVal} label="Rotate 270°" value="270" />
              </Picker>
            </View>
          </View>
        );

      // 💧 PDF WATERMARKER
      case 'Pdf Watermarker':
        return (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Watermark Text"
              onChangeText={(t) => setFields({ ...fields, watermark: t })}
            />
          </View>
        );

      // 🔃 PDF REORDERER
      case 'Pdf Reorderer':
        return (
          <View style={{ alignItems: 'center', gap: 10 }}>
            <View style={styles.previewBox}>
              <Text>Upload your PDF first</Text>
            </View>
          </View>
        );

      default:
        return <Text>No options available.</Text>;
    }

  }

  const handleFilePicker = async (): Promise<void> => {
    try {
      const result = await pick({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        allowMultiSelection: name === 'Pdf Merger' || name === 'Images to Pdf',
      });

      setSelectedFiles(result);
      handleUpload(result);
    } catch (err) {
      console.error('Document picker error:', err);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleUpload = async (files: DocumentPickerResponse[]): Promise<void> => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          processFiles(files);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  useEffect(() => {

    let interval: ReturnType<typeof setInterval> | null = null;

    if (processing) {
      console.log("Started processing interval...");
      interval = setInterval(() => {
        setIsBOnTop(prev => !prev);
        console.log("Changed");
      }, 500);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        console.log("Stopped interval");
      }
    };
  }, [processing]);


  const processFiles = async (files: DocumentPickerResponse[]): Promise<void> => {
    try {
      setProcessing(true);
      const formData = new FormData();

      switch (name) {
        case 'Pdf Compresser':
          files.forEach((file) => {
            const mime = (file as any).type ?? (file as any).mimeType ?? 'application/octet-stream';
            formData.append('files[]', {
              uri: file.uri,
              type: mime,
              name: file.name,
            } as any);
          });
          console.log("Compresser");
          formData.append('value', fields.value); // compression level (/screen, /default, etc.)
          break;

        case 'Pdf Splitter':
          files.forEach((file) => {
            const mime = (file as any).type ?? (file as any).mimeType ?? 'application/octet-stream';
            formData.append('files[]', {
              uri: file.uri,
              type: mime,
              name: file.name,
            } as any);
          });
          console.log("Splitter");
          formData.append('start-page', fields.start);
          formData.append('end-page', fields.end);
          console.log(fields)
          break;

        case 'Pdf Watermarker':
          files.forEach((file) => {
            const mime = (file as any).type ?? (file as any).mimeType ?? 'application/octet-stream';
            formData.append('files[]', {
              uri: file.uri,
              type: mime,
              name: file.name,
            } as any);
          });
          console.log("Watermarker");
          formData.append('code', fields.watermark); // Flask expects 'code' for watermark text
          break;

        case 'Pdf Encryptor':
          for (const file of files) {
            const fixedUri = await normalizeUri(file.uri, file.name as any);

            formData.append('files[]', {
              uri: fixedUri,
              type: 'application/pdf',
              name: file.name || 'input.pdf',
            } as any);
          }

          const password = fields.password
            .normalize('NFKC')
            .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width chars
            .replace(/\s+/g, '')
            .trim();

          formData.append('code', password);
          break;


        case 'Pdf Unlocker': // Decryptor
          files.forEach((file) => {
            const mime = (file as any).type ?? (file as any).mimeType ?? 'application/octet-stream';
            formData.append('files[]', {
              uri: file.uri,
              type: mime,
              name: file.name,
            } as any);
          });
          console.log("Unlocker");
          formData.append('code', fields.password); // same key 'code', different tool
          break;

        default:
          console.log("Default");
          files.forEach((file) => {
            const mime = (file as any).type ?? (file as any).mimeType ?? 'application/octet-stream';
            formData.append('files[]', {
              uri: file.uri,
              type: mime,
              name: file.name,
            } as any);
          });
          break;
      }



      const baseUrl = 'https://pdf-toolkit-0z2m.onrender.com/tools/';
      console.log('Uploading to:', `${baseUrl}${encodeURIComponent(name)}`);
      console.log('FormData content:', formData);
      console.log(fields)

      const response = await fetch(`${baseUrl}${encodeURIComponent(name)}`, {
        method: 'POST',
        body: formData,
      });

      // Get headers
      const contentType = response.headers.get('content-type');
      const contentDisposition = response.headers.get('content-disposition');

      // Determine extension
      let extension: any = 'bin'; // fallback

      if (contentDisposition) {
        // Try extracting filename
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match) {
          extension = match[1].split('.').pop();
        }
        console.log("Disposition")
      } else if (contentType) {
        if (contentType.includes('pdf')) extension = 'pdf';
        else if (contentType.includes('zip')) extension = 'zip';
        else if (contentType.includes('msword')) extension = 'doc';
        else if (contentType.includes('officedocument.wordprocessingml')) extension = 'docx';
        console.log("Content-Type")
      }

      // Read file
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Generate dynamic file path
      const path =
        Platform.OS === 'android'
          ? `${RNFS.ExternalDirectoryPath}/Processed_File.${extension}`
          : `${RNFS.DocumentDirectoryPath}/Processed_File.${extension}`;

      // Save file
      await RNFS.writeFile(path, buffer.toString('base64'), 'base64');

      setIsROnTop(true)
      Alert.alert('Success', `PDF saved to: ${path}`);
      console.log('Saved to:', path);
      setTimeout(() => {
        navigation.pop(1);
      }, 5000);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while processing the file');
      console.error('Upload error:', error);
    }
  };

  const openTool = (toolName: string,): void => {
    const tool = tools.find(t => t.name == toolName);
    if (tool) {
      navigation.replace('Tool', tool)
    }
  };

  const renderToolItem = (tool: { name: string; icon: React.FC }): JSX.Element => (
    <TouchableOpacity
      key={tool.name}
      onPress={() => openTool(tool.name)}
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
            {/*<View style={styles.menuSection}>
              <Text style={styles.menuTitle}>Pdf Security</Text>
              {securityTools.map(renderToolItem)}
            </View>
            */}

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
        {/* Tool Card */}
        <View style={styles.toolCard}>
          <View style={styles.toolHeader}>
            <View style={styles.toolFigure}>
              <Image source={{ uri: img1 }} style={styles.toolImage} />
              <Text style={styles.toolCaption}>{caption1}</Text>
            </View>

            <View style={styles.converterContainer}>
              <Image
                source={convert}
                style={[styles.convertIcon1, {
                  zIndex: 5,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }]}
              />
              <Image
                source={convertr}
                style={[styles.convertIcon2, {
                  zIndex: isBOnTop ? 10 : 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }]}
              />
              <Image
                source={convertg}
                style={[styles.convertIcon3, { zIndex: isROnTop ? 10 : 0 }]}
              />
            </View>

            <View style={styles.toolFigure}>
              <Image source={{ uri: img2 }} style={styles.toolImage} />
              <Text style={styles.toolCaption}>{caption2}</Text>
            </View>
          </View>

          {/* Extra Fields */}
          {renderExtraFields(name)}

          {/* Upload Button */}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleFilePicker}
            disabled={uploading}
          >
            <Text style={styles.uploadButtonText}>
              {uploading ? 'Uploading...' : 'Upload File'}
            </Text>
          </TouchableOpacity>

          {/* Progress Bar */}
          {uploading && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
              </View>
              <Text style={styles.progressText}>{uploadProgress}%</Text>
            </View>
          )}

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <View style={styles.instructionsList}>
            {(instructions[name] || ['No instructions found.']).map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>{index + 1}.</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Tools */}
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedTitle}>Recommended Tools:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedScroll}
          >
            {recommendedTools.map((tool, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recommendedCard}
                onPress={() => openTool(tool.name)}
              >
                <View style={[styles.recommendedIconContainer, { backgroundColor: tool.bgColor }]}>
                  <tool.icon />
                </View>
                <Text style={styles.recommendedDescription}>{tool.description}</Text>
                <View style={[styles.recommendedButton, { backgroundColor: tool.color }]}>
                  <Text style={styles.recommendedButtonText}>{tool.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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
            <View style={styles.socialsContainer}>
              <Image
                source={require('../assets/images/facebook.png')}
                style={styles.socialIcon}
              />
              <Image
                source={require('../assets/images/instagram.png')}
                style={styles.socialIcon}
              />
              <Image
                source={require('../assets/images/linkedin.png')}
                style={styles.socialIcon}
              />
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
    textAlign: 'center',
    marginTop: 4,
    width: 95
  },
  convertIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  uploadButton: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#666667',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f97316',
    borderRadius: 9999,
  },
  progressText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  instructionsCard: {
    width: width > 768 ? width * 0.33 : width * 0.9,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instructionsList: {
    gap: 8,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    color: '#ff982aff',
    padding: 8,
    width: 200,
    textAlign: 'center',
  },
  pickerWrapper: {
    width: 250,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#ebebebff'
  },
  pickerVal: {
    color: '#ff982aff',
    fontSize: 12,
  },
  previewBox: {
    borderWidth: 2,
    borderColor: '#000',
    height: 100,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  recommendedSection: {
    width: width * 0.9,
    marginVertical: 20,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  recommendedScroll: {
    gap: 12,
    paddingRight: 16,
  },
  recommendedCard: {
    width: 130,
    minHeight: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendedIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendedDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    flex: 1,
    marginVertical: 8,
  },
  recommendedButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  recommendedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  footer: {
    width: width,
    backgroundColor: '#f97316',
    padding: 16,
    marginBottom: -16,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 8,
    color: '#ffffff'
  },
  footerSection: {
    marginBottom: 1,
  },
  footerLink: {
    fontSize: 14,
    color: '#ffffff'
  },
  socialsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginVertical: 8,
  },
  socialIcon: {
    width: 20,
    height: 20
  },
  copyright: {
    fontSize: 14,
    marginTop: 8,
    color: '#ffffff'
  },
  converterContainer: {
    position: 'relative',
  },
  convertIcon1: {
    zIndex: 5
  },
  convertIcon2: {
    position: 'absolute',
  },
  convertIcon3: {
    position: 'absolute'
  }
});

export default ToolJinjaScreen;