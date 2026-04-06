import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const contactInfo: ContactInfo[] = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'support@pdfxfools.com',
    },
    {
      icon: '⏱️',
      title: 'Response Time',
      value: '24-48 hours',
    },
    {
      icon: '🔒',
      title: 'Privacy',
      value: 'Your data is safe',
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We aim to respond within 24-48 hours. For urgent issues, please mark it as "Urgent" in your subject line.',
    },
    {
      question: 'Can I report a security issue?',
      answer: 'Absolutely. Please email security@pdfxfools.com with details. We take security seriously and will investigate promptly.',
    },
    {
      question: 'Do you offer API access?',
      answer: 'Currently, our tools are web-based only. We\'re exploring API options—reach out if you\'re interested!',
    },
    {
      question: 'Can I request a new feature?',
      answer: 'Yes! We\'d love to hear your ideas. Use the form above or email feature-request@pdfxfools.com with your suggestion.',
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('Form Data:', formData);
    Alert.alert(
      'Success',
      'Thank you! Your message has been sent. We\'ll get back to you soon!'
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
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
          <Text style={styles.title}>Get in Touch</Text>
          <Text style={styles.subtitle}>
            Have a question or feedback? We'd love to hear from you. No foolin' around—we read every message.
          </Text>
        </View>

        {/* Contact Card */}
        <View style={styles.contactCard}>
          {/* Info Section */}
          <View style={styles.infoGrid}>
            {contactInfo.map((info, index) => (
              <View key={index} style={styles.infoBox}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>{info.icon}</Text>
                </View>
                <Text style={styles.infoTitle}>{info.title}</Text>
                <Text style={styles.infoValue}>{info.value}</Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Contact Form */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="john@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="How can we help?"
                placeholderTextColor="#9ca3af"
                value={formData.subject}
                onChangeText={(value) => handleInputChange('subject', value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Tell us what's on your mind..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={formData.message}
                onChangeText={(value) => handleInputChange('message', value)}
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Notice */}
          <View style={styles.privacyNotice}>
            <Text style={styles.privacyText}>
              <Text style={styles.privacyLabel}>Your privacy matters:</Text> We only use your contact information to respond to your message. We never share or sell your data. See our privacy policy for details.
            </Text>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <TouchableOpacity
                key={index}
                style={styles.faqItem}
                onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Text style={[styles.faqArrow, expandedFAQ === index && styles.faqArrowOpen]}>
                    ▼
                  </Text>
                </View>
                {expandedFAQ === index && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            ))}
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
    textAlign: 'center',
    lineHeight: 24,
  },
  contactCard: {
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
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 16,
    flexWrap: 'wrap',
  },
  infoBox: {
    flex: 1,
    minWidth: width > 768 ? '31%' : '100%',
    alignItems: 'center',
    backgroundColor: '#f8eada',
    padding: 24,
    borderRadius: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fed7aa',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 24,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  privacyNotice: {
    backgroundColor: '#dbeafe',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  privacyLabel: {
    fontWeight: '600',
  },
  faqSection: {
    width: width > 768 ? width * 0.8 : width * 0.9,
    marginVertical: 32,
  },
  faqTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  faqContainer: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    lineHeight: 22,
  },
  faqArrow: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 12,
  },
  faqArrowOpen: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 12,
    lineHeight: 20,
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

export default ContactPage;