import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PrivacySection {
  title: string;
  content?: string;
  subsections?: Array<{
    subtitle: string;
    text: string;
  }>;
  list?: string[];
  type?: 'default' | 'security' | 'contact';
}

const PrivacyPolicy: React.FC = () => {
  const sections: PrivacySection[] = [
    {
      title: '1. Introduction',
      content:
        'Welcome to PdfxFools ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
    },
    {
      title: '2. Information We Collect',
      subsections: [
        {
          subtitle: '2.1 Information You Provide',
          text: 'When using PdfxFools, you may voluntarily provide information such as email addresses through contact forms or feedback submissions. This information is only collected when you choose to provide it.',
        },
        {
          subtitle: '2.2 Uploaded Files',
          text: 'When you upload PDF files or other documents to our service, we process them to deliver the requested functionality (compression, conversion, merging, etc.). Your files are NOT stored beyond the processing period and are automatically deleted.',
        },
        {
          subtitle: '2.3 Automatically Collected Information',
          text: 'We may collect limited technical information such as IP address, browser type, device type, and pages visited through standard web server logs. This helps us understand usage patterns and improve our service.',
        },
      ],
    },
    {
      title: '3. How We Use Your Information',
      content: 'We use collected information for the following purposes:',
      list: [
        'To provide, maintain, and improve our services',
        'To process your file conversions and transformations',
        'To respond to your inquiries and support requests',
        'To analyze usage patterns and optimize performance',
        'To detect and prevent fraud or security issues',
        'To comply with legal obligations',
      ],
    },
    {
      title: '4. Data Security',
      content:
        'Your security is important to us. We implement industry-standard security measures including SSL/TLS encryption, secure servers, and regular security audits to protect your information. However, no online platform is 100% secure, and we cannot guarantee absolute security.',
      type: 'security',
    },
    {
      title: '5. Third-Party Sharing',
      content:
        'We do NOT share, sell, or rent your personal information or uploaded files to third parties. We only share information when required by law or to protect our rights. We may use trusted service providers (such as hosting providers) who are bound by confidentiality agreements.',
    },
    {
      title: '6. Cookies & Tracking',
      content:
        'PdfxFools does NOT use cookies for tracking or advertising purposes. We do not track your behavior across the web. Your browsing activity on our site remains private and is only used internally to improve functionality.',
    },
    {
      title: '7. Your Rights',
      content: 'You have the right to:',
      list: [
        'Request access to personal data we hold about you',
        'Request correction of inaccurate information',
        'Request deletion of your information',
        'Opt-out of communications (if applicable)',
        'Request information about how your data is processed',
      ],
    },
    {
      title: '8. File Retention & Deletion',
      content:
        'All uploaded files are processed in real-time and automatically deleted from our servers immediately after processing is complete. We do not retain backups of your files. Temporary files created during processing are securely wiped.',
    },
    {
      title: '9. Children\'s Privacy',
      content:
        'PdfxFools is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child under 13 has provided us with information, we will promptly delete such information.',
    },
    {
      title: '10. Policy Changes',
      content:
        'We reserve the right to update this Privacy Policy at any time. Changes will be effective immediately upon posting to the website. We encourage you to review this policy periodically to stay informed about how we protect your privacy.',
    },
    {
      title: '11. Contact Us',
      content:
        'If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:',
      type: 'contact',
    },
  ];

  const securityFeatures = [
    'End-to-end encryption for file transfers',
    'Automatic file deletion after processing',
    'No file backups or storage',
    'Regular security updates',
  ];

  const contactInfo = [
    { label: 'Email', value: 'privacy@pdfxfools.com' },
    { label: 'Support', value: 'support@pdfxfools.com' },
    { label: 'Website', value: 'www.pdfxfools.com' },
  ];

  const renderSection = (section: PrivacySection, index: number) => {
    return (
      <View key={index} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>

        {/* Regular content */}
        {section.content && (
          <Text style={styles.sectionContent}>{section.content}</Text>
        )}

        {/* Subsections */}
        {section.subsections && (
          <View style={styles.subsectionsContainer}>
            {section.subsections.map((sub, subIndex) => (
              <View key={subIndex} style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{sub.subtitle}</Text>
                <Text style={styles.sectionContent}>{sub.text}</Text>
              </View>
            ))}
          </View>
        )}

        {/* List items */}
        {section.list && (
          <View style={styles.listContainer}>
            {section.list.map((item, listIndex) => (
              <View key={listIndex} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Security box for section 4 */}
        {section.type === 'security' && (
          <View style={styles.securityBox}>
            <Text style={styles.securityTitle}>Key Security Features:</Text>
            {securityFeatures.map((feature, featureIndex) => (
              <View key={featureIndex} style={styles.securityItem}>
                <Text style={styles.securityBullet}>•</Text>
                <Text style={styles.securityText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Contact box for section 11 */}
        {section.type === 'contact' && (
          <View style={styles.contactBox}>
            {contactInfo.map((info, contactIndex) => (
              <Text key={contactIndex} style={styles.contactText}>
                <Text style={styles.contactLabel}>{info.label}:</Text> {info.value}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>PdfxFools</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.subtitle}>
            Your privacy is our priority. Last updated: January 2025
          </Text>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Render all sections */}
          {sections.map((section, index) => renderSection(section, index))}

          {/* Footer Note */}
          <View style={styles.footerNote}>
            <Text style={styles.footerNoteText}>
              <Text style={styles.footerNoteEmphasis}>Your privacy matters to us.</Text> PdfxFools is committed to transparency and protecting your data. We believe in keeping things simple—no tracking, no selling your data, just reliable PDF tools.
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 PdfxFools. All rights reserved. No foolin' around with your documents.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbeb',
  },
  navbar: {
    height: 64,
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
  backButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  main: {
    flex: 1,
  },
  mainContent: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4b5563',
    textAlign: 'center'
  },
  contentCard: {
    width: width > 768 ? width * 0.8 : width * 0.9,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#fed7aa',
    paddingBottom: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ea580c',
  },
  sectionContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 8,
  },
  subsectionsContainer: {
    marginTop: 12,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  listContainer: {
    marginLeft: 16,
    marginTop: 12,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#374151',
    marginRight: 12,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },
  securityBox: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  securityItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  securityBullet: {
    fontSize: 14,
    color: '#374151',
    marginRight: 8,
    fontWeight: 'bold',
  },
  securityText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    flex: 1,
  },
  contactBox: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#f97316',
    padding: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  contactText: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  contactLabel: {
    fontWeight: '600',
  },
  footerNote: {
    backgroundColor: '#fed7aa',
    borderWidth: 1,
    borderColor: '#fcd34d',
    padding: 24,
    borderRadius: 12,
    marginTop: 32,
  },
  footerNoteText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerNoteEmphasis: {
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PrivacyPolicy;