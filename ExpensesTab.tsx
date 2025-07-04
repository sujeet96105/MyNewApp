import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppState } from './AppStateProvider';

const ExpensesTab = () => {
  const {
    isLoading,
    categoryFilter,
    setCategoryFilter,
    categories,
    dateRange,
    openDatePicker,
    newExpense,
    setNewExpense,
    roommates,
    handleSplitWithChange,
    handleAddExpense,
    getFilteredExpenses,
    handleRemoveExpense,
  } = useAppState();

  // You may want to move isDarkMode to context if used in multiple places
  const isDarkMode = false; // Replace with useColorScheme if needed

  const styles = StyleSheet.create({
    tabContent: { padding: 16, flex: 1 },
    filterContainer: { marginBottom: 16, backgroundColor: isDarkMode ? '#1A1A1A' : '#f5f5f5', padding: 12, borderRadius: 8 },
    filterTitle: { fontSize: 16, fontWeight: '600', color: isDarkMode ? '#DDDDDD' : '#333333', marginBottom: 8 },
    label: { fontSize: 14, fontWeight: '500', color: isDarkMode ? '#DDDDDD' : '#333333', marginBottom: 8 },
    selectItem: { borderWidth: 1, borderColor: isDarkMode ? '#333' : '#ddd', borderRadius: 8, padding: 8, backgroundColor: isDarkMode ? '#2A2A2A' : '#f0f0f0', minWidth: 80, alignItems: 'center', margin: 4 },
    selectedItem: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
    selectItemText: { color: isDarkMode ? '#A1A1A1' : '#666666' },
    selectedItemText: { color: '#FFFFFF', fontWeight: '500' },
    dateRangeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    dateButton: { flex: 1, padding: 10, backgroundColor: isDarkMode ? '#2A2A2A' : '#E5E7EB', borderRadius: 6, margin: 2, alignItems: 'center' },
    dateButtonText: { color: isDarkMode ? '#DDDDDD' : '#333333' },
    card: { backgroundColor: isDarkMode ? '#1E1E1E' : '#ffffff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
    cardTitle: { fontSize: 18, fontWeight: '600', color: isDarkMode ? '#FFFFFF' : '#000000', marginBottom: 12 },
    input: { borderWidth: 1, borderColor: isDarkMode ? '#333' : '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: isDarkMode ? '#2A2A2A' : '#ffffff', color: isDarkMode ? '#FFFFFF' : '#000000' },
    addButton: { backgroundColor: '#4F46E5', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
    addButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
    selectContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
    categoryPickerContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, justifyContent: 'space-between' },
    categoryPickerItem: { borderWidth: 1, borderColor: isDarkMode ? '#333' : '#ddd', borderRadius: 8, padding: 8, backgroundColor: isDarkMode ? '#2A2A2A' : '#f0f0f0', margin: 4, width: '48%', alignItems: 'center', marginBottom: 8 },
    selectedCategoryItem: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
    expenseItem: { borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#333' : '#eee', paddingVertical: 12, marginBottom: 8 },
    expenseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    expenseDescription: { fontSize: 16, fontWeight: '500', color: isDarkMode ? '#FFFFFF' : '#000000', flex: 1, marginRight: 8 },
    expenseAmount: { fontSize: 16, fontWeight: '600', color: '#10B981' },
    expenseDetails: { fontSize: 14, color: isDarkMode ? '#A1A1A1' : '#6B7280', marginBottom: 2 },
    expenseDate: { fontSize: 12, color: isDarkMode ? '#9CA3AF' : '#9CA3AF', marginBottom: 8, fontStyle: 'italic' },
    deleteButton: { alignSelf: 'flex-start', padding: 6, marginTop: 8 },
    deleteButtonText: { color: '#EF4444', fontSize: 14, fontWeight: '500' },
    emptyMessage: { textAlign: 'center', padding: 16, color: isDarkMode ? '#A1A1A1' : '#6B7280' },
  });

  if (isLoading) {
    return (
      <View style={[styles.tabContent, { flex: 1, justifyContent: 'center', alignItems: 'center' }] }>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ color: isDarkMode ? '#DDDDDD' : '#333333', marginTop: 16 }}>
          Loading your data...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter Expenses</Text>
        {/* Category Filter */}
        <Text style={styles.label}>Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[
                styles.selectItem,
                categoryFilter === 'All' && styles.selectedItem,
              ]}
              onPress={() => setCategoryFilter('All')}
            >
              <Text
                style={[
                  styles.selectItemText,
                  categoryFilter === 'All' && styles.selectedItemText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.selectItem,
                  categoryFilter === category && styles.selectedItem,
                ]}
                onPress={() => setCategoryFilter(category)}
              >
                <Text
                  style={[
                    styles.selectItemText,
                    categoryFilter === category && styles.selectedItemText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* Date Range Filter */}
        <Text style={[styles.label, { marginTop: 12 }]}>Date Range:</Text>
        <View style={styles.dateRangeContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => openDatePicker('start')}
          >
            <Text style={styles.dateButtonText}>{dateRange.start}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => openDatePicker('end')}
          >
            <Text style={styles.dateButtonText}>{dateRange.end}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Add Expense Form */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add New Expense</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newExpense.description}
          onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={newExpense.amount.toString()}
          onChangeText={(text) => setNewExpense({ ...newExpense, amount: Number(text) })}
        />
        <TextInput
          style={styles.input}
          placeholder="Paid By"
          value={newExpense.paidBy}
          onChangeText={(text) => setNewExpense({ ...newExpense, paidBy: text })}
        />
        <Text style={styles.label}>Split With:</Text>
        <View style={styles.selectContainer}>
          {roommates.map((mate) => (
            <TouchableOpacity
              key={mate}
              style={[
                styles.selectItem,
                newExpense.splitWith.includes(mate) && styles.selectedItem,
              ]}
              onPress={() => handleSplitWithChange(mate)}
            >
              <Text
                style={[
                  styles.selectItemText,
                  newExpense.splitWith.includes(mate) && styles.selectedItemText,
                ]}
              >
                {mate}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Category:</Text>
        <View style={styles.categoryPickerContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPickerItem,
                newExpense.category === category && styles.selectedCategoryItem,
              ]}
              onPress={() => setNewExpense({ ...newExpense, category })}
            >
              <Text
                style={[
                  styles.selectItemText,
                  newExpense.category === category && styles.selectedItemText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      {/* Expenses List */}
      <FlatList
        data={getFilteredExpenses()}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View style={styles.expenseHeader}>
              <Text style={styles.expenseDescription}>{item.description}</Text>
              <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
            </View>
            <Text style={styles.expenseDetails}>Paid by: {item.paidBy}</Text>
            <Text style={styles.expenseDetails}>Split with: {item.splitWith.join(', ')}</Text>
            <Text style={styles.expenseDate}>{item.date} {item.time}</Text>
            <Text style={styles.expenseDetails}>Category: {item.category}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => item.id && handleRemoveExpense(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No expenses to show</Text>
        }
      />
    </View>
  );
};

export default ExpensesTab; 