import { Button, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'azure',
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

    taskContainer: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
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

})