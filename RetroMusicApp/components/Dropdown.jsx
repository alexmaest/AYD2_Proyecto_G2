import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useToggle } from '../hooks/useToggle'
import { FontAwesome } from '@expo/vector-icons'

const Dropdown = ({ selectedValue, setSelectedValue, values }) => {
  const { status, toggleStatus, setFalse } = useToggle()

  return (
    <TouchableOpacity onPress={toggleStatus} style={styles.Dropdown}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.Text}>{selectedValue}</Text>
        {status
          ? (
            <FontAwesome name='chevron-up' size={16} color='#222222' />)
          : (<FontAwesome name='chevron-down' size={16} color='#222222' />)}
      </View>
      {status && (
        <View style={styles.DropdownList}>
          {values.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedValue(item)
                setFalse()
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  Dropdown: {
    backgroundColor: '#F3EFE0',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    position: 'relative',
    minWidth: 160
  },
  Text: {
    color: '#222222',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  DropdownList: {
    flexDirection: 'column',
    gap: 16,
    backgroundColor: '#ded2a9',
    paddingVertical: 16,
    paddingHorizontal: 24,
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    borderRadius: 8,
    minWidth: 160
  }
})
