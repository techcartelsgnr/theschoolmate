import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import commanServices from "../../redux/services/commanServices";
import RenderHTML from "react-native-render-html";

const { width } = Dimensions.get("window");

const EventsScreen = () => { // ✨ RENAMED COMPONENT
    const navigation = useNavigation();
    const { token } = useSelector((state) => state.auth);

    const [events, setEvents] = useState([]); // ✨ RENAMED STATE
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchEvents(); // ✨ CALL RENAMED FUNCTION
    }, [token]);

    const fetchEvents = () => { // ✨ RENAMED FUNCTION
        commanServices
            .getEvents(token) // ✨ CALL THE CORRECT API SERVICE
            .then((res) => setEvents(res.events)) // ✨ ACCESS res.events
            .catch((err) => console.log("Events API Error:", err)) // ✨ TYPO FIX
            .finally(() => setLoading(false));
    };

    const onRefresh = () => {
        setRefreshing(true);
        commanServices
            .getEvents(token) // ✨ CALL THE CORRECT API SERVICE
            .then((res) => setEvents(res.events)) // ✨ ACCESS res.events
            .finally(() => setRefreshing(false));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    // ----------------------------------------------------
    // RENDER EACH EVENT ITEM
    // ----------------------------------------------------
    const renderEvent = ({ item }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() => navigation.navigate("EventsDetailScreen", { eventId: item.slug })}
        >
            <View style={styles.eventContent}> 
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.eventImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={{ color: COLORS.textDark }}>No Image</Text>
                        </View>
                    )}
                <Text style={styles.eventDate}>{formatDate(item.created_at)}</Text>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <View>
                    {/* HTML Short Description */}
                    {item.short_desc ? (
                        <RenderHTML
                            contentWidth={width - 140}
                            source={{ html: item.short_desc }}
                            defaultTextProps={{ numberOfLines: 2 }}
                            tagsStyles={{
                                p: {
                                    fontFamily: "InterTight-Bold",
                                    fontSize: 14,
                                    color: COLORS.gray,
                                    marginTop: 0,
                                    lineHeight: 20,
                                },
                            }}
                        />
                    ) : (
                        <Text style={styles.eventDesc}>No description available</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

            {/* Header */}
            <View style={styles.headerAtten}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>

                <Text style={styles.headerTitleAtten}>Events</Text>

                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
            ) : events.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 40, color: COLORS.textDark }}>
                    No Events Found
                </Text>
            ) : (
                <FlatList
                    data={events} 
                    renderItem={renderEvent} // USE RENAMED RENDER FUNCTION
                    keyExtractor={(item, index) =>
                        (item.id ? item.id.toString() : index.toString())
                    }
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    contentContainerStyle={{ padding: 10 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

// ----------------------------------------------------

const styles = StyleSheet.create({
    container: { flex: 1 },

    headerAtten: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.whiteBackground,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },

    headerTitleAtten: {
        fontSize: 18,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
    },

    eventCard: { // ✨ RENAMED STYLE
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        padding: 10,
        flexDirection: "row",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },

    eventImage: { // ✨ RENAMED STYLE
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: "contain",
        // borderWidth: 1,
        // borderColor: COLORS.grayBG,
    },

    placeholderImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        backgroundColor: "#e0e0e0",
        justifyContent: "center",
        alignItems: "center",
    },

    eventContent: { // ✨ RENAMED STYLE
        flex: 1,
        // Removed marginLeft: 10 as it interfered with the image being on the right
    },

    eventTitle: { // ✨ RENAMED STYLE
        fontSize: 18, // Slightly reduced font size for better fit
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
        width: '68%', // Adjusted width for title to make space for image
        flexWrap: 'wrap',
        marginBottom: 5,
    },

    eventDesc: { // ✨ RENAMED STYLE
        fontSize: 12,
        color: COLORS.gray,
        marginVertical: 4,
        fontFamily: "Quicksand-Medium",
    },

    eventDate: { // ✨ RENAMED STYLE
        fontSize: 12,
        color: COLORS.gray,
        fontFamily: "Quicksand-Medium",
        marginTop: 5,
    },
});

export default EventsScreen;