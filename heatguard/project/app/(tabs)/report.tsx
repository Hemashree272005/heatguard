import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, MapPin, Camera, Phone, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const symptoms = [
  { id: 'dizziness', label: 'Dizziness', icon: '😵' },
  { id: 'dehydration', label: 'Dehydration', icon: '🥵' },
  { id: 'nausea', label: 'Nausea', icon: '🤢' },
  { id: 'weakness', label: 'Weakness', icon: '😮‍💨' },
  { id: 'headache', label: 'Headache', icon: '🤕' },
  { id: 'cramping', label: 'Muscle Cramps', icon: '💪' },
];

const priorities = [
  { id: 'emergency', label: 'Emergency', color: '#DC2626', description: 'Life-threatening situation' },
  { id: 'urgent', label: 'Urgent', color: '#EA580C', description: 'Needs immediate attention' },
  { id: 'moderate', label: 'Moderate', color: '#D97706', description: 'Concerning symptoms' },
  { id: 'low', label: 'Low', color: '#059669', description: 'Mild discomfort' },
];

export default function ReportScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [priority, setPriority] = useState('moderate');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Current Location (Auto-detected)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert('Please select at least one symptom');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedSymptoms([]);
        setDescription('');
        setPriority('moderate');
      }, 3000);
    }, 1500);
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      'This will call emergency services (108). Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => {/* In real app, would call emergency number */} }
      ]
    );
  };

  if (isSubmitted) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#F0FDF4', '#FFFFFF']} style={styles.gradient}>
          <View style={styles.successContainer}>
            <CheckCircle size={64} color="#059669" />
            <Text style={styles.successTitle}>Report Submitted</Text>
            <Text style={styles.successMessage}>
              Your heat emergency report has been sent to local authorities and nearby volunteers. 
              Help is on the way.
            </Text>
            <View style={styles.successActions}>
              <Text style={styles.successActionText}>Reference ID: HG2025001</Text>
              <Text style={styles.successActionText}>Estimated response: 15-20 minutes</Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FEF2F2', '#FFFFFF']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <AlertTriangle size={24} color="#DC2626" />
            <Text style={styles.title}>Report Heat Emergency</Text>
          </View>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={handleEmergencyCall}
          >
            <Phone size={16} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>Call 108</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationCard}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          </View>

          {/* Symptoms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What are you experiencing?</Text>
            <Text style={styles.sectionSubtitle}>Select all symptoms that apply</Text>
            <View style={styles.symptomsGrid}>
              {symptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom.id}
                  style={[
                    styles.symptomCard,
                    selectedSymptoms.includes(symptom.id) && styles.symptomCardSelected
                  ]}
                  onPress={() => toggleSymptom(symptom.id)}
                >
                  <Text style={styles.symptomIcon}>{symptom.icon}</Text>
                  <Text style={[
                    styles.symptomLabel,
                    selectedSymptoms.includes(symptom.id) && styles.symptomLabelSelected
                  ]}>
                    {symptom.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Priority */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Severity Level</Text>
            <View style={styles.priorityList}>
              {priorities.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.priorityCard,
                    priority === item.id && { borderColor: item.color, backgroundColor: `${item.color}10` }
                  ]}
                  onPress={() => setPriority(item.id)}
                >
                  <View style={styles.priorityHeader}>
                    <View style={[styles.priorityDot, { backgroundColor: item.color }]} />
                    <Text style={[styles.priorityLabel, priority === item.id && { color: item.color }]}>
                      {item.label}
                    </Text>
                  </View>
                  <Text style={styles.priorityDescription}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Additional Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Details (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Describe your condition, number of people affected, or other relevant information..."
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </View>

          {/* Photo Upload */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Photo (Optional)</Text>
            <TouchableOpacity style={styles.photoUpload}>
              <Camera size={24} color="#6B7280" />
              <Text style={styles.photoUploadText}>Tap to add photo</Text>
              <Text style={styles.photoUploadSubtext}>Help responders understand the situation</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, (!selectedSymptoms.length || isSubmitting) && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!selectedSymptoms.length || isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting Report...' : 'Submit Emergency Report'}
            </Text>
          </TouchableOpacity>

          {/* Info */}
          <View style={styles.infoCard}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.infoText}>
              Your report will be sent to local emergency services, nearby cooling centers, 
              and community volunteers for immediate assistance.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  emergencyButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    flex: 1,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  symptomCardSelected: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  symptomIcon: {
    fontSize: 24,
  },
  symptomLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  symptomLabelSelected: {
    color: '#DC2626',
  },
  priorityList: {
    gap: 12,
  },
  priorityCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  priorityDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 16,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    minHeight: 100,
  },
  photoUpload: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  photoUploadText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  photoUploadSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#0369A1',
    flex: 1,
    lineHeight: 16,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#059669',
    marginTop: 24,
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  successActions: {
    gap: 8,
    alignItems: 'center',
  },
  successActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#059669',
  },
});