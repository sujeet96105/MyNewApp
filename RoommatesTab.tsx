import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useAppState } from './AppStateProvider';

const RoommatesTab = () => {
  const {
    newRoommate,
    setNewRoommate,
    handleAddRoommate,
    roommates,
    handleRemoveRoommate,
    isLoading,
  } = useAppState();

  const isDarkMode = false; // Replace with useColorScheme if needed

  const styles = StyleSheet.create({
    tabContent: { padding: 16, flex: 1 },
    card: { backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
    cardTitle: { fontSize: 18, fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#000000', marginBottom: 12 },
    roommateInput: { flex: 1, borderWidth: 1, borderColor: isDarkMode ? '#333' : '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: isDarkMode ? '#2A2A2A' : '#ffffff', color: isDarkMode ? '#FFFFFF' : '#000000' },
    addButton: { backgroundColor: '#4F46E5', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
    addButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
    roommateItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#333' : '#eee' },
    roommateName: { fontSize: 16, color: isDarkMode ? '#FFFFFF' : '#000000' },
    deleteButton: { alignSelf: 'flex-start', padding: 6, marginTop: 8 },
    deleteButtonText: { color: '#EF4444', fontSize: 14, fontWeight: '500' },
    emptyMessage: { textAlign: 'center', padding: 16, color: isDarkMode ? '#A1A1A1' : '#6B7280' },
  });

  return (
    <View style={styles.tabContent}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add New Roommate</Text>
        <TextInput
          style={styles.roommateInput}
          placeholder="Roommate Name"
          value={newRoommate}
          onChangeText={setNewRoommate}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddRoommate}>
          <Text style={styles.addButtonText}>Add Roommate</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={roommates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.roommateItem}>
            <Text style={styles.roommateName}>{item}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveRoommate(item)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No roommates added yet</Text>
        }
      />
    </View>
  );
};

export default RoommatesTab; 