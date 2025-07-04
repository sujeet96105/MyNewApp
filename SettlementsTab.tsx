import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppState } from './AppStateProvider';

const SettlementsTab = () => {
  const { settlements } = useAppState();
  const isDarkMode = false; // Replace with useColorScheme if needed

  const styles = StyleSheet.create({
    tabContent: { padding: 16, flex: 1 },
    settlementText: {
      fontSize: 14,
      color: isDarkMode ? '#E5E7EB' : '#333333',
    },
    debtorName: {
      color: '#EF4444',
      fontWeight: '600',
    },
    creditorName: {
      color: '#10B981',
      fontWeight: '600',
    },
    settlementAmount: {
      color: '#4F46E5',
      fontWeight: '600',
    },
    emptyMessage: {
      color: isDarkMode ? '#A1A1A1' : '#6B7280',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 24,
    },
  });

  return (
    <View style={styles.tabContent}>
      {settlements.length > 0 ? (
        settlements.map((item) => {
          if ('text' in item) {
            return (
              <Text key={item.key} style={styles.settlementText}>
                {item.text}
              </Text>
            );
          } else {
            return (
              <Text key={item.key} style={styles.settlementText}>
                <Text style={styles.debtorName}>{item.from}</Text> pays <Text style={styles.creditorName}>{item.to}</Text> ${item.amount.toFixed(2)}
              </Text>
            );
          }
        })
      ) : (
        <Text style={styles.emptyMessage}>No settlements needed at this time</Text>
      )}
    </View>
  );
};

export default SettlementsTab; 