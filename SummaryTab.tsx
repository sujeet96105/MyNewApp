import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppState } from './AppStateProvider';
import { AppStateProvider } from './AppStateProvider';

const SummaryTab = () => {
  const { summaryData } = useAppState();
  const isDarkMode = false; // Replace with useColorScheme if needed

  const styles = StyleSheet.create({
    tabContent: { padding: 16, flex: 1 },
    summaryItem: { borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#333' : '#eee', paddingVertical: 12 },
    summaryName: { fontSize: 16, fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#000000' },
    summaryDetails: { marginLeft: 8, marginTop: 4 },
    summaryRow: { flexDirection: 'row', marginBottom: 2 },
    summaryLabel: { width: 60, color: isDarkMode ? '#A1A1A1' : '#6B7280' },
    summaryValue: { color: isDarkMode ? '#DDDDDD' : '#333333' },
    summaryBalance: { fontWeight: '600' },
    positiveBalance: { color: '#10B981' },
    negativeBalance: { color: '#EF4444' },
  });

  return (
    <AppStateProvider>
      <View style={styles.tabContent}>
        {Object.keys(summaryData).map((mate) => (
          <View key={mate} style={styles.summaryItem}>
            <Text style={styles.summaryName}>{mate}</Text>
            <View style={styles.summaryDetails}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Paid:</Text>
                <Text style={styles.summaryValue}>${summaryData[mate].paid.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Owes:</Text>
                <Text style={styles.summaryValue}>${summaryData[mate].owes.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Balance:</Text>
                <Text
                  style={[
                    styles.summaryValue,
                    styles.summaryBalance,
                    summaryData[mate].balance >= 0 ? styles.positiveBalance : styles.negativeBalance,
                  ]}
                >
                  ${summaryData[mate].balance.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </AppStateProvider>
  );
};

export default SummaryTab; 