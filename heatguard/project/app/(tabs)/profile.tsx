import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, MapPin, Shield, Users, ChartBar as BarChart3, Download, Info, ChevronRight, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const userProfile = {
  name: 'Priya Sharma',
  location: 'Sector 15, Gurgaon',
  memberSince: 'March 2024',
  reportsSubmitted: 12,
  volunteering: true,
  emergencyContact: '+91-9876543210'
};

const adminStats = {
  totalReports: 1247,
  activeAlerts: 8,
  volunteersActive: 156,
  centersOpen: 18
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [volunteerMode, setVolunteerMode] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  const settingsOptions = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Heat alerts and emergency updates',
      type: 'toggle',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled
    },
    {
      icon: MapPin,
      title: 'Location Sharing',
      description: 'Share location for better heat risk alerts',
      type: 'toggle',
      value: locationSharing,
      onToggle: setLocationSharing
    },
    {
      icon: Users,
      title: 'Volunteer Mode',
      description: 'Help others during heat emergencies',
      type: 'toggle',
      value: volunteerMode,
      onToggle: setVolunteerMode
    },
    {
      icon: Shield,
      title: 'Admin Dashboard',
      description: 'Access NGO and planning tools',
      type: 'toggle',
      value: adminMode,
      onToggle: setAdminMode
    }
  ];

  const menuItems = [
    {
      icon: Download,
      title: 'Offline Safety Guide',
      description: 'Download for emergency use',
      type: 'action'
    },
    {
      icon: BarChart3,
      title: 'My Heat Reports',
      description: 'View your submitted reports',
      type: 'action'
    },
    {
      icon: Info,
      title: 'About HeatGuard',
      description: 'App info and community guidelines',
      type: 'action'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#F8FAFC', '#FFFFFF']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User size={32} color="#FFFFFF" />
                </View>
                <View style={styles.statusIndicator} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userProfile.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.profileLocation}>{userProfile.location}</Text>
                </View>
                <Text style={styles.memberSince}>Member since {userProfile.memberSince}</Text>
              </View>
            </View>

            {/* Profile Stats */}
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.reportsSubmitted}</Text>
                <Text style={styles.statLabel}>Reports Submitted</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.volunteering ? 'Active' : 'Inactive'}</Text>
                <Text style={styles.statLabel}>Volunteer Status</Text>
              </View>
            </View>
          </View>

          {/* Admin Dashboard (if enabled) */}
          {adminMode && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Admin Dashboard</Text>
              <View style={styles.adminCard}>
                <View style={styles.adminHeader}>
                  <Shield size={20} color="#7C3AED" />
                  <Text style={styles.adminTitle}>NGO/Planning Dashboard</Text>
                </View>
                
                <View style={styles.adminStats}>
                  <View style={styles.adminStatRow}>
                    <View style={styles.adminStat}>
                      <Text style={styles.adminStatValue}>{adminStats.totalReports}</Text>
                      <Text style={styles.adminStatLabel}>Total Reports</Text>
                    </View>
                    <View style={styles.adminStat}>
                      <Text style={styles.adminStatValue}>{adminStats.activeAlerts}</Text>
                      <Text style={styles.adminStatLabel}>Active Alerts</Text>
                    </View>
                  </View>
                  <View style={styles.adminStatRow}>
                    <View style={styles.adminStat}>
                      <Text style={styles.adminStatValue}>{adminStats.volunteersActive}</Text>
                      <Text style={styles.adminStatLabel}>Active Volunteers</Text>
                    </View>
                    <View style={styles.adminStat}>
                      <Text style={styles.adminStatValue}>{adminStats.centersOpen}</Text>
                      <Text style={styles.adminStatLabel}>Centers Open</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.adminButton}>
                  <Text style={styles.adminButtonText}>Open Full Dashboard</Text>
                  <ChevronRight size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Volunteer Mode (if enabled) */}
          {volunteerMode && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Volunteer Center</Text>
              <View style={styles.volunteerCard}>
                <View style={styles.volunteerHeader}>
                  <Users size={20} color="#059669" />
                  <Text style={styles.volunteerTitle}>Active Volunteer</Text>
                  <View style={styles.volunteerBadge}>
                    <Text style={styles.volunteerBadgeText}>ACTIVE</Text>
                  </View>
                </View>
                
                <Text style={styles.volunteerDescription}>
                  You're helping your community during heat emergencies. You'll receive notifications 
                  when someone nearby needs assistance.
                </Text>

                <View style={styles.volunteerActions}>
                  <TouchableOpacity style={styles.volunteerButton}>
                    <Text style={styles.volunteerButtonText}>View Nearby Requests</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.volunteerButtonSecondary}>
                    <Text style={styles.volunteerButtonSecondaryText}>Volunteer Guide</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            {settingsOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <View key={index} style={styles.settingItem}>
                  <View style={styles.settingContent}>
                    <IconComponent size={20} color="#6B7280" />
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>{option.title}</Text>
                      <Text style={styles.settingDescription}>{option.description}</Text>
                    </View>
                  </View>
                  {option.type === 'toggle' && (
                    <Switch
                      value={option.value}
                      onValueChange={option.onToggle}
                      trackColor={{ false: '#E5E7EB', true: '#059669' }}
                      thumbColor={'#FFFFFF'}
                    />
                  )}
                </View>
              );
            })}
          </View>

          {/* Menu Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Options</Text>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.menuItem}>
                  <View style={styles.menuContent}>
                    <IconComponent size={20} color="#6B7280" />
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuDescription}>{item.description}</Text>
                    </View>
                  </View>
                  <ChevronRight size={16} color="#9CA3AF" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Emergency Contact */}
          <View style={styles.emergencySection}>
            <View style={styles.emergencyHeader}>
              <AlertTriangle size={20} color="#DC2626" />
              <Text style={styles.emergencyTitle}>Emergency Contact</Text>
            </View>
            <Text style={styles.emergencyContact}>{userProfile.emergencyContact}</Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Update Emergency Contact</Text>
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appInfoText}>HeatGuard v1.0.0</Text>
            <Text style={styles.appInfoText}>Protecting communities from extreme heat</Text>
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
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 20,
    marginTop: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#059669',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  memberSince: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  adminCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  adminHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  adminTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  adminStats: {
    marginBottom: 20,
    gap: 16,
  },
  adminStatRow: {
    flexDirection: 'row',
    gap: 16,
  },
  adminStat: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  adminStatValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#7C3AED',
    marginBottom: 4,
  },
  adminStatLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  adminButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  volunteerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  volunteerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  volunteerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
  },
  volunteerBadge: {
    backgroundColor: '#059669',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  volunteerBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  volunteerDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  volunteerActions: {
    gap: 12,
  },
  volunteerButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  volunteerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  volunteerButtonSecondary: {
    borderColor: '#059669',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  volunteerButtonSecondaryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  emergencySection: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 16,
    margin: 20,
    padding: 20,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
  emergencyContact: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  emergencyButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  appInfo: {
    alignItems: 'center',
    padding: 20,
    gap: 4,
  },
  appInfoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});