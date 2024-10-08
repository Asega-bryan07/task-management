import { Button, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#BAF6A2',
    },
    
    taskContainer: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'azure',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    input: {
        marginBottom: 16,
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
    },

      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },

      button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
      },

      editButton: {
        backgroundColor: 'lightgreen',
      },

      deleteButton: {
        backgroundColor: 'orange',
      },

      buttonText: {
        fontWeight: 'bold',
      },

      quoteContainer: {
        backgroundColor: 'lightblue',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      
      searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
      },
      quoteText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'lightblue',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
      },

      darkMode: {
        backgroundColor: '#fff',
        color: '#000',
      },
      
      lightMode: {
        backgroundColor: '#000',
        color: '#fff',
      },
});

