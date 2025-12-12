import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import RenderHTML from "react-native-render-html";
import { COLORS, FontSizes } from "../../theme/theme";
import { useSelector } from "react-redux";
import commanServices from "../../redux/services/commanServices";

const { width } = Dimensions.get("window");

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

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
};

const EventsDetailScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const { token } = useSelector(state => state.auth);

    const [event, setEvent] = useState(null);
    const [contentImages, setContentImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadEventDetail = () => {
        return commanServices
            .getEventDetail(token, eventId)
            .then(res => {
                setEvent(res.event);
                setContentImages(res.contentImages);
            });
    };

    useEffect(() => {
        loadEventDetail().finally(() => setLoading(false));
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        loadEventDetail().finally(() => setRefreshing(false));
    };

    if (loading) {
        return (
            <View style={styles.eventsLoaderContainer}>
                <ActivityIndicator size="large" color={COLORS.success} />
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.eventsLoaderContainer}>
                <Text style={{ color: COLORS.textDark }}>Event not found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* IMAGE SECTION (COVERS STATUS BAR) */}
            <View style={styles.eventsImageWrapper}>
                <Image source={{ uri: event.image_url }} style={styles.eventsCoverImage} />

                {/* FULL BLACK OVERLAY INCLUDING STATUSBAR */}
                <View style={styles.eventsFullOverlay} />

                {/* BACK BUTTON */}
                <TouchableOpacity style={styles.eventsBackButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>

                {/* BOTTOM SHADOW + TITLE */}
                <View style={styles.eventsImageOverlay}>
                    <Text style={styles.eventsImageTitle}>{event.title}</Text>

                    <View style={styles.eventsImageTagRow}>
                        <Text style={styles.eventsImageType}>{event.type}</Text>
                        <Text style={styles.eventsImageDate}>{formatDate(event.created_at)}</Text>
                    </View>
                </View>
            </View>

            {/* WHITE CONTENT STARTS AFTER IMAGE */}
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.eventsContentContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.success]} />
                    }
                >
                    {/* FULL DESCRIPTION */}
                    {event.full_description && (
                        <RenderHTML
                            contentWidth={width}
                            source={{ html: event.full_description }}
                            tagsStyles={{ p: { fontFamily: "InterTight-Bold", fontSize: FontSizes.small, color: COLORS.gray, marginTop: 10, paddingHorizontal: 15, lineHeight: 20, }, b: { fontWeight: "800", fontSize: FontSizes.small, color: COLORS.gray, }, strong: { fontWeight: "900", }, i: { fontFamily: "Quicksand-Medium", }, u: { textDecorationLine: "underline" }, }} enableExperimentalFeatures renderersProps={{ text: { allowFontScaling: false }, }}
                        />
                    )}

                    {/* CONTENT IMAGES */}
                    {contentImages.length > 0 && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.eventsSubHeader}>Event Gallery</Text>

                            {contentImages.map((img, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: img.image_url }}
                                    style={styles.eventsContentImage}
                                />
                            ))}
                        </View>
                    )}

                    <View style={{ height: 60 }} />

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

// -----------------------------------
// STYLES
// -----------------------------------
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    eventsLoaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },


    eventsContentImage: {
        width: width - 30,
        height: 200,
        resizeMode: "cover",
        borderRadius: 12,
        marginBottom: 15,
        alignSelf: "center",
    },
    eventsImageWrapper: {
        width: "100%",
        height: 300,          // increase height to look better behind statusbar
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    eventsCoverImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    eventsFullOverlay: {
        position: "absolute",
        top: 0,     // ← NOW IT COVERS STATUS BAR AREA
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    eventsBackButton: {
        position: "absolute",
        top: 45,    // Below status bar area
        left: 15,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 10,
        borderRadius: 50,
        zIndex: 10,
    },
    eventsImageOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        paddingBottom: 25,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    eventsImageTitle: {
        fontSize: FontSizes.large,
        fontFamily: "Quicksand-Bold",
        color: "#fff",
        marginBottom: 6,
    },
    eventsImageTagRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    eventsImageType: {
        fontSize: FontSizes.xsmall,
        fontFamily: "InterTight-Bold",
        color: "#fff",
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
    },
    eventsImageDate: {
        fontSize: FontSizes.xsmall,
        fontFamily: "InterTight-Medium",
        color: "#fff",
    },
    eventsContentContainer: {
        marginTop: 240,  // pushes white content under the image
        backgroundColor: "#fefefe",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      paddingTop: 10,
        flex: 1,
    },
    eventsSubHeader: {
        fontSize: FontSizes.normal,
        fontFamily: "Quicksand-Bold",
        paddingHorizontal: 15,
        marginBottom: 10,
        color: COLORS.textDark,
    },
    eventsContentImage: {
        width: width - 30,
        height: 200,
        resizeMode: "cover",
        borderRadius: 12,
        marginBottom: 15,
        alignSelf: "center",
    },

});

export default EventsDetailScreen;
