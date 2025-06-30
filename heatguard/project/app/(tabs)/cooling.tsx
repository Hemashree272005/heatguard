import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Waves, Clock, Users, Filter, Navigation } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const coolingCenters = [
  {
    id: 1,
    name: 'City Community Center',
    type: 'Cooling Shelter',
    address: 'Sector 15, Block A',
    distance: '0.5 km',
    capacity: '150 people',
    occupancy: 45,
    amenities: ['AC', 'Water', 'Medical Aid', 'Food'],
    hours: '24/7',
    status: 'open',
    phone: '+91-9876543210'
  },
  {
    id: 2,
    name: 'Central Mall',
    type: 'Public AC Space',
    address: 'Main Market Road',
    distance: '1.2 km',
    capacity: '300 people',
    occupancy: 120,
    amenities: ['AC', 'Water', 'Restrooms', 'Food Court'],
    hours: '10 AM - 10 PM',
    status: 'open',
    phone: '+91-9876543211'
  },
  {
    id: 3,
    name: 'Metro Station',
    type: 'Transit Cooling',
    address: 'Central Metro Station',
    distance: '0.8 km',
    capacity: '200 people',
    occupancy: 180,
    amenities: ['AC', 'Water', 'Restrooms'],
    hours: '5 AM - 11 PM',
    status: 'crowded',
    phone: '+91-9876543212'
  },
  {
    id: 4,
    name: 'Public Library',
    type: 'Cooling Shelter',
    address: 'Knowledge Park',
    distance: '2.1 km',
    capacity: '80 people',
    occupancy: 25,
    amenities: ['AC', 'Water', 'WiFi', 'Reading Space'],
    hours: '9 AM - 7 PM',
    status: 'open',
    phone: '+91-9876543213'
  },
  {
    id: 5,
    name: 'Hospital Emergency Wing',
    type: 'Medical Cooling',
    address: 'City Hospital Complex',
    distance: '1.8 km',
    capacity: '50 people',
    occupancy: 10,
    amenities: ['AC', 'Medical Care', 'Water', 'Emergency Care'],
    hours: '24/7',
    status: 'open',
    phone: '+91-9876543214'
  }
];

const filters = [
  { id: 'all', label: 'All Centers', count: 5 },
  { id: 'shelter', label: 'Shelters', count: 3 },
  { id: 'public', label: 'Public Spaces', count: 2 },
  { id: 'medical', label: 'Medical', count: 1 },
];

export default function CoolingScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#059669';
      case 'crowded': return '#EA580C';
      case 'closed': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Available';
      case 'crowded': return 'Crowded';
      case 'closed': return 'Closed';
      default: return 'Unknown';
    }
  };

  const getOccupancyPercentage = (occupancy: number, capacity: string) => {
    const maxCapacity = parseInt(capacity.split(' ')[0]);
    return Math.round((occupancy / maxCapacity) * 100);
  };

  const filteredCenters = coolingCenters.filter(center => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'shelter') return center.type.includes('Shelter');
    if (selectedFilter === 'public') return center.type.includes('Public') || center.type.includes('Transit');
    if (selectedFilter === 'medical') return center.type.includes('Medical');
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#F0F9FF', '#FFFFFF']} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Waves size={24} color="#0284C7" />
            <Text style={styles.title}>Cooling Centers</Text>
          </View>
          <View style={styles.locationInfo}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.locationText}>Near you</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Open Centers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>2.3k</Text>
            <Text style={styles.statLabel}>Available Spots</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0.5</Text>
            <Text style={styles.statLabel}>Nearest (km)</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <Filter size={16} color="#6B7280" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.id && styles.filterChipActive
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.filterTextActive
                ]}>
                  {filter.label} ({filter.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Centers List */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.centersList}>
          {filteredCenters.map((center) => (
            <TouchableOpacity
              key={center.id}
              style={[
                styles.centerCard,
                selectedCenter === center.id && styles.centerCardSelected
              ]}
              onPress={() => setSelectedCenter(selectedCenter === center.id ? null : center.id)}
            >
              <View style={styles.centerHeader}>
                <View style={styles.centerInfo}>
                  <Text style={styles.centerName}>{center.name}</Text>
                  <Text style={styles.centerType}>{center.type}</Text>
                  <View style={styles.centerMeta}>
                    <MapPin size={12} color="#6B7280" />
                    <Text style={styles.centerDistance}>{center.distance}</Text>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(center.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(center.status) }]}>
                      {getStatusText(center.status)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.navigationButton}>
                  <Navigation size={16} color="#0284C7" />
                </TouchableOpacity>
              </View>

              <View style={styles.centerDetails}>
                <View style={styles.capacityInfo}>
                  <Users size={14} color="#6B7280" />
                  <Text style={styles.capacityText}>
                    {center.occupancy}/{center.capacity.split(' ')[0]} people
                  </Text>
                  <View style={styles.capacityBar}>
                    <View 
                      style={[
                        styles.capacityFill,
                        {
                          width: `${getOccupancyPercentage(center.occupancy, center.capacity)}%`,
                          backgroundColor: getOccupancyPercentage(center.occupancy, center.capacity) > 80 ? '#EA580C' : '#059669'
                        }
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.hoursInfo}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.hoursText}>{center.hours}</Text>
                </View>
              </View>

              {selectedCenter === center.id && (
                <View style={styles.expandedDetails}>
                  <View style={styles.amenitiesSection}>
                    <Text style={styles.amenitiesTitle}>Available Amenities</Text>
                    <View style={styles.amenitiesList}>
                      {center.amenities.map((amenity, index) => (
                        <View key={index} style={styles.amenityTag}>
                          <Text style={styles.amenityText}>{amenity}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Contact & Address</Text>
                    <Text style={styles.contactAddress}>{center.address}</Text>
                    <TouchableOpacity style={styles.phoneButton}>
                      <Text style={styles.phoneText}>Call: {center.phone}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.directionsButton}>
                      <Navigation size={16} color="#FFFFFF" />
                      <Text style={styles.directionsButtonText}>Get Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                      <Text style={styles.shareButtonText}>Share Location</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Emergency Footer */}
        <View style={styles.emergencyFooter}>
          <Text style={styles.emergencyText}>
            Can't find nearby cooling? Call emergency helpline: 108
          </Text>
        </View>
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
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#0284C7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  filters: {
    flex: 1,
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#0284C7',
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  centersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  centerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  centerCardSelected: {
    borderColor: '#0284C7',
  },
  centerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  centerInfo: {
    flex: 1,
  },
  centerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  centerType: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0284C7',
    marginBottom: 8,
  },
  centerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  centerDistance: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  navigationButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F9FF',
  },
  centerDetails: {
    gap: 8,
  },
  capacityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  capacityText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
  },
  capacityBar: {
    width: 60,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 2,
  },
  hoursInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hoursText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  expandedDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 16,
  },
  amenitiesSection: {},
  amenitiesTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityTag: {
    backgroundColor: '#F0F9FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  amenityText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#0284C7',
  },
  contactSection: {},
  contactTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  contactAddress: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  phoneButton: {
    alignSelf: 'flex-start',
  },
  phoneText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#0284C7',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  directionsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0284C7',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  directionsButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  shareButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0284C7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  shareButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#0284C7',
  },
  emergencyFooter: {
    backgroundColor: '#FEF2F2',
    borderTopColor: '#FECACA',
    borderTopWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  emergencyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#7F1D1D',
    textAlign: 'center',
  },
});