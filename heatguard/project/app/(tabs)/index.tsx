import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Thermometer, CircleAlert as AlertCircle, MapPin, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const heatZones = [
  { id: 1, name: 'Sector 15', temperature: 45, risk: 'high', reports: 12, color: '#DC2626' },
  { id: 2, name: 'Old City', temperature: 43, risk: 'high', reports: 8, color: '#DC2626' },
  { id: 3, name: 'Tech Park', temperature: 38, risk: 'medium', reports: 3, color: '#EA580C' },
  { id: 4, name: 'Green Valley', temperature: 35, risk: 'low', reports: 1, color: '#059669' },
];

const currentWeather = {
  temperature: 42,
  feels_like: 47,
  humidity: 65,
  location: 'Delhi, India',
  lastUpdated: '2 mins ago'
};

export default function HeatMapScreen() {
  const [selectedZone, setSelectedZone] = useState(null);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#DC2626';
      case 'medium': return '#EA580C';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FEF2F2', '#FFFFFF']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>HeatGuard</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.location}>{currentWeather.location}</Text>
            </View>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>{currentWeather.temperature}°C</Text>
            <Text style={styles.feelsLike}>Feels like {currentWeather.feels_like}°C</Text>
          </View>
        </View>

        {/* Current Alert */}
        <View style={styles.alertCard}>
          <AlertCircle size={20} color="#DC2626" />
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>Heat Wave Alert</Text>
            <Text style={styles.alertDescription}>
              Extreme heat conditions expected. Stay indoors 12PM-4PM.
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Heat Map Simulation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Live Heat Map</Text>
            <View style={styles.mapContainer}>
              <View style={styles.mapGrid}>
                {heatZones.map((zone) => (
                  <TouchableOpacity
                    key={zone.id}
                    style={[styles.mapZone, { backgroundColor: zone.color }]}
                    onPress={() => setSelectedZone(zone)}
                  >
                    <Text style={styles.zoneTemp}>{zone.temperature}°</Text>
                    <Text style={styles.zoneName}>{zone.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Map Legend */}
              <View style={styles.legend}>
                <Text style={styles.legendTitle}>Risk Levels</Text>
                <View style={styles.legendItems}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#DC2626' }]} />
                    <Text style={styles.legendText}>High (&gt;40°C)</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#EA580C' }]} />
                    <Text style={styles.legendText}>Medium (35-40°C)</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#059669' }]} />
                    <Text style={styles.legendText}>Low (&lt;35°C)</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Selected Zone Details */}
          {selectedZone && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Zone Details</Text>
              <View style={styles.zoneDetailCard}>
                <View style={styles.zoneHeader}>
                  <Text style={styles.zoneDetailName}>{selectedZone.name}</Text>
                  <View style={[styles.riskBadge, { backgroundColor: getRiskColor(selectedZone.risk) }]}>
                    <Text style={styles.riskBadgeText}>{getRiskText(selectedZone.risk)}</Text>
                  </View>
                </View>
                <View style={styles.zoneStats}>
                  <View style={styles.zoneStat}>
                    <Thermometer size={16} color="#6B7280" />
                    <Text style={styles.zoneStatText}>{selectedZone.temperature}°C</Text>
                  </View>
                  <View style={styles.zoneStat}>
                    <AlertCircle size={16} color="#6B7280" />
                    <Text style={styles.zoneStatText}>{selectedZone.reports} reports today</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Quick Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Heat Reports</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>42°C</Text>
                <Text style={styles.statLabel}>Peak Temp</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>High Risk Zones</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>18</Text>
                <Text style={styles.statLabel}>Active Shelters</Text>
              </View>
            </View>
          </View>

          {/* Last Updated */}
          <View style={styles.lastUpdated}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.lastUpdatedText}>Last updated {currentWeather.lastUpdated}</Text>
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
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  tempContainer: {
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#DC2626',
  },
  feelsLike: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#7F1D1D',
    lineHeight: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  mapContainer: {
    paddingHorizontal: 20,
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  mapZone: {
    width: (width - 64) / 2,
    height: 80,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneTemp: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  zoneName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginTop: 4,
  },
  legend: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  legendTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  legendItems: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  zoneDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  zoneDetailName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  zoneStats: {
    flexDirection: 'row',
    gap: 20,
  },
  zoneStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  zoneStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
  },
  statCard: {
    width: (width - 56) / 2,
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
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  lastUpdated: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 20,
  },
  lastUpdatedText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});