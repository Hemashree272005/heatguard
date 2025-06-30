import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Sun, Droplets, Chrome as Home, TriangleAlert as AlertTriangle, Heart, Baby, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const tipCategories = [
  {
    id: 'prevention',
    title: 'Prevention',
    icon: Sun,
    color: '#EA580C',
    tips: [
      {
        title: 'Stay Hydrated',
        description: 'Drink water regularly, even if you don\'t feel thirsty. Aim for 8-10 glasses per day.',
        details: 'Avoid alcohol and caffeine as they can dehydrate you. Add a pinch of salt to your water to replace electrolytes.',
        importance: 'critical'
      },
      {
        title: 'Dress Appropriately',
        description: 'Wear light-colored, loose-fitting, breathable clothing.',
        details: 'Cotton fabrics work best. Cover your head and wear sunglasses when outdoors.',
        importance: 'important'
      },
      {
        title: 'Avoid Peak Hours',
        description: 'Stay indoors between 12 PM and 4 PM when the sun is strongest.',
        details: 'If you must go out, seek shade and take frequent breaks in cool areas.',
        importance: 'critical'
      },
      {
        title: 'Cool Your Body',
        description: 'Take cool showers, use damp towels, or apply cold packs to pulse points.',
        details: 'Focus on wrists, neck, and ankles where blood vessels are close to the skin.',
        importance: 'helpful'
      }
    ]
  },
  {
    id: 'home',
    title: 'Home Safety',
    icon: Home,
    color: '#059669',
    tips: [
      {
        title: 'Create Cross-Ventilation',
        description: 'Open windows on opposite sides of your home to create airflow.',
        details: 'Use fans to push hot air out and pull cool air in. Close curtains during the day.',
        importance: 'important'
      },
      {
        title: 'Use Cooling Techniques',
        description: 'Place wet towels over chairs, use ice in front of fans, or freeze water bottles.',
        details: 'Spray water on the floor and let it evaporate. Sleep on the floor if upper floors are too hot.',
        importance: 'helpful'
      },
      {
        title: 'Avoid Heat Sources',
        description: 'Don\'t use ovens, dryers, or other heat-generating appliances during hot hours.',
        details: 'Cook early morning or late evening. Unplug electronics that generate heat.',
        importance: 'important'
      }
    ]
  },
  {
    id: 'symptoms',
    title: 'Warning Signs',
    icon: AlertTriangle,
    color: '#DC2626',
    tips: [
      {
        title: 'Heat Exhaustion Signs',
        description: 'Heavy sweating, weakness, nausea, headache, muscle cramps.',
        details: 'Move to a cool place immediately, remove excess clothing, and apply cool water to skin.',
        importance: 'critical'
      },
      {
        title: 'Heat Stroke Emergency',
        description: 'High body temperature, hot/dry skin, rapid pulse, confusion.',
        details: 'Call emergency services immediately (108). This is life-threatening and requires immediate medical attention.',
        importance: 'critical'
      },
      {
        title: 'Dehydration Warning',
        description: 'Thirst, dry mouth, little or no urination, dizziness.',
        details: 'Drink water slowly and steadily. Seek medical help if symptoms persist.',
        importance: 'important'
      }
    ]
  },
  {
    id: 'vulnerable',
    title: 'Vulnerable Groups',
    icon: Heart,
    color: '#7C3AED',
    tips: [
      {
        title: 'Elderly Care',
        description: 'Older adults are at higher risk and may not feel heat as acutely.',
        details: 'Check on elderly neighbors regularly. Ensure they have access to air conditioning or cooling centers.',
        importance: 'critical'
      },
      {
        title: 'Children & Infants',
        description: 'Young children cannot regulate body temperature effectively.',
        details: 'Never leave children in vehicles. Dress them in minimal, light clothing. Offer water frequently.',
        importance: 'critical'
      },
      {
        title: 'Chronic Conditions',
        description: 'People with heart disease, diabetes, or taking medications need extra care.',
        details: 'Consult your doctor about heat precautions. Keep medications in cool, dry places.',
        importance: 'important'
      }
    ]
  }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
];

export default function TipsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('prevention');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const currentCategory = tipCategories.find(cat => cat.id === selectedCategory);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return '#DC2626';
      case 'important': return '#EA580C';
      case 'helpful': return '#059669';
      default: return '#6B7280';
    }
  };

  const getImportanceText = (importance: string) => {
    switch (importance) {
      case 'critical': return 'Critical';
      case 'important': return 'Important';
      case 'helpful': return 'Helpful';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FFFBEB', '#FFFFFF']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <BookOpen size={24} color="#EA580C" />
            <Text style={styles.title}>Heat Safety Tips</Text>
          </View>
          <TouchableOpacity style={styles.languageButton}>
            <Globe size={16} color="#6B7280" />
            <Text style={styles.languageText}>
              {languages.find(lang => lang.code === selectedLanguage)?.flag} 
              {languages.find(lang => lang.code === selectedLanguage)?.name}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Language Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.languageSelector}
          contentContainerStyle={styles.languageSelectorContent}
        >
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageChip,
                selectedLanguage === language.code && styles.languageChipActive
              ]}
              onPress={() => setSelectedLanguage(language.code)}
            >
              <Text style={styles.languageFlag}>{language.flag}</Text>
              <Text style={[
                styles.languageChipText,
                selectedLanguage === language.code && styles.languageChipTextActive
              ]}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categories}
          contentContainerStyle={styles.categoriesContent}
        >
          {tipCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && { borderColor: category.color, backgroundColor: `${category.color}10` }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconComponent 
                  size={24} 
                  color={selectedCategory === category.id ? category.color : '#6B7280'} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && { color: category.color }
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tips Content */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.tipsContent}>
          <View style={styles.categoryHeader}>
            <View style={styles.categoryTitleRow}>
              {currentCategory && <currentCategory.icon size={20} color={currentCategory.color} />}
              <Text style={styles.categoryTitle}>{currentCategory?.title} Tips</Text>
            </View>
            <Text style={styles.categoryDescription}>
              Essential information to stay safe during extreme heat conditions
            </Text>
          </View>

          {currentCategory?.tips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <TouchableOpacity
                style={styles.tipHeader}
                onPress={() => setExpandedTip(expandedTip === `${selectedCategory}-${index}` ? null : `${selectedCategory}-${index}`)}
              >
                <View style={styles.tipTitleRow}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <View style={[styles.importanceBadge, { backgroundColor: getImportanceColor(tip.importance) }]}>
                    <Text style={styles.importanceBadgeText}>{getImportanceText(tip.importance)}</Text>
                  </View>
                </View>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </TouchableOpacity>

              {expandedTip === `${selectedCategory}-${index}` && (
                <View style={styles.tipDetails}>
                  <Text style={styles.tipDetailsText}>{tip.details}</Text>
                </View>
              )}
            </View>
          ))}

          {/* Emergency Contact */}
          <View style={styles.emergencyCard}>
            <AlertTriangle size={20} color="#DC2626" />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Emergency Helpline</Text>
              <Text style={styles.emergencyDescription}>
                If you or someone else shows signs of heat stroke, call 108 immediately
              </Text>
              <TouchableOpacity style={styles.emergencyButton}>
                <Text style={styles.emergencyButtonText}>Call 108 Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Resources */}
          <View style={styles.resourcesSection}>
            <Text style={styles.resourcesTitle}>Additional Resources</Text>
            
            <TouchableOpacity style={styles.resourceCard}>
              <Droplets size={16} color="#0284C7" />
              <View style={styles.resourceContent}>
                <Text style={styles.resourceName}>Hydration Calculator</Text>
                <Text style={styles.resourceDescription}>Calculate your daily water needs</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resourceCard}>
              <Baby size={16} color="#7C3AED" />
              <View style={styles.resourceContent}>
                <Text style={styles.resourceName}>Child Safety Guide</Text>
                <Text style={styles.resourceDescription}>Special tips for protecting children</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resourceCard}>
              <Heart size={16} color="#DC2626" />
              <View style={styles.resourceContent}>
                <Text style={styles.resourceName}>First Aid Guide</Text>
                <Text style={styles.resourceDescription}>How to help someone with heat illness</Text>
              </View>
            </TouchableOpacity>
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
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  languageText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  languageSelector: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  languageSelectorContent: {
    gap: 8,
  },
  languageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  languageChipActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  languageFlag: {
    fontSize: 14,
  },
  languageChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  languageChipTextActive: {
    color: '#FFFFFF',
  },
  categories: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoriesContent: {
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
    gap: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    textAlign: 'center',
  },
  tipsContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    marginBottom: 24,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  tipHeader: {
    padding: 16,
  },
  tipTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
  },
  importanceBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  importanceBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  tipDetails: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tipDetailsText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 18,
  },
  emergencyCard: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#7F1D1D',
    lineHeight: 16,
    marginBottom: 12,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  emergencyButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  resourcesSection: {
    marginBottom: 32,
  },
  resourcesTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    gap: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  resourceDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});