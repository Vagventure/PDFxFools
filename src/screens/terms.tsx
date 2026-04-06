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

interface TermsSection {
  title: string;
  content: string;
  list?: string[];
}

const TermsConditions: React.FC = () => {
  const sections: TermsSection[] = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing and using PdfxFools ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: '2. Use License',
      content:
        'Permission is granted to temporarily download one copy of the materials (information or software) on PdfxFools for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
      list: [
        'Modify or copy the materials',
        'Use the materials for any commercial purpose or for any public display',
        'Attempt to decompile or reverse engineer any software',
        'Remove any copyright or other proprietary notations',
        'Transfer the materials to another person or "mirror" the materials on any other server',
      ],
    },
    {
      title: '3. File Upload & Processing',
      content:
        'When you upload files to PdfxFools, you retain all ownership rights to your documents. We process your files securely and delete them automatically after processing is complete. We do not store, backup, or share your files with any third parties.',
    },
    {
      title: '4. Disclaimer',
      content:
        'The materials on PdfxFools are provided on an \'as is\' basis. PdfxFools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: '5. Limitations',
      content:
        'In no event shall PdfxFools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PdfxFools.',
    },
    {
      title: '6. Accuracy of Materials',
      content:
        'The materials appearing on PdfxFools could include technical, typographical, or photographic errors. PdfxFools does not warrant that any of the materials on the website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice.',
    },
    {
      title: '7. Links',
      content:
        'PdfxFools has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PdfxFools of the site. Use of any such linked website is at the user\'s own risk.',
    },
    {
      title: '8. Modifications',
      content:
        'PdfxFools may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
    },
    {
      title: '9. Governing Law',
      content:
        'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which PdfxFools operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
    },
    {
      title: '10. Contact Information',
      content:
        'If you have any questions about these Terms & Conditions, please contact us at:',
    },
  ];

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
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.subtitle}>Last updated: January 2025</Text>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Sections */}
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Text style={styles.sectionContent}>{section.content}</Text>

              {/* List Items */}
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

              {/* Contact Box for Section 10 */}
              {section.title === '10. Contact Information' && (
                <View style={styles.contactBox}>
                  <Text style={styles.contactText}>
                    <Text style={styles.contactLabel}>Email:</Text> support@pdfxfools.com
                  </Text>
                  <Text style={styles.contactText}>
                    <Text style={styles.contactLabel}>Website:</Text> www.pdfxfools.com
                  </Text>
                </View>
              )}
            </View>
          ))}

          {/* Footer Note */}
          <View style={styles.footerNote}>
            <Text style={styles.footerNoteText}>
              These Terms & Conditions are provided as-is. PdfxFools reserves the right to modify these terms at any time. Continued use of the service constitutes acceptance of any modifications.
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
  contactBox: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#f97316',
    padding: 16,
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
  ctaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
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

export default TermsConditions;