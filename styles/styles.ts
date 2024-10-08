import { StyleSheet } from "react-native";

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

})