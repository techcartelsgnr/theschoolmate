import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ActivityIndicator
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FontSizes } from "../../theme/theme";
import RenderHTML from "react-native-render-html";

import { useSelector } from "react-redux";
import commanServices from "../../redux/services/commanServices";

const { width } = Dimensions.get("window");

export default function ActivitiesDetailScreen({ route, navigation }) {
    const { slug } = route.params;
    const { token } = useSelector((state) => state.auth);

    const [activity, setActivity] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadActivityDetails();
    }, []);

    const loadActivityDetails = async () => {
        setLoading(true);

        const res = await commanServices.getActivitiesDetail(token, slug);

        setActivity(res.activityDetail || null);
        setGalleryImages(res.contentImages || []);
        setLoading(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    if (loading || !activity) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* ---------------- HEADER IMAGE ---------------- */}
            <View>
                <Image
                    source={{ uri: activity.image_url }}
                    style={styles.bannerImage}
                />

                {/* Gradient Overlay */}
                <View style={styles.imageOverlay} />

                {/* BACK BUTTON */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* ---------------- MAIN CONTENT ---------------- */}
            <ScrollView contentContainerStyle={styles.contentContainer}>

                {/* Title */}
                <Text style={styles.title}>{activity.title}</Text>

                {/* Date */}
                <Text style={styles.dateText}>{formatDate(activity.created_at)}</Text>

                <View style={styles.divider} />

{/* ---------------- HTML FULL DESCRIPTION ---------------- */}
                {activity.full_description ? (
                    <RenderHTML
                        contentWidth={width - 0}
                        source={{ html: activity.full_description }}
                        tagsStyles={{
                            p: {
                                fontFamily: "InterTight-Regular",
                                fontSize: FontSizes.normal,
                                color: COLORS.textDark,
                                lineHeight: 25,
                                marginBottom: 12,
                            },
                            strong: { fontFamily: "InterTight-Bold" },
                        }}
                    />
                ) : (
                    <Text style={styles.noDesc}>No content available</Text>
                )}


                {/* ---------------- GALLERY SECTION ---------------- */}
                {galleryImages.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Gallery</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: 10 }}
                        >
                            {galleryImages.map((img, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: img.image_url }}
                                    style={styles.galleryImage}
                                />
                            ))}
                        </ScrollView>

                        <View style={styles.divider} />
                    </>
                )}

                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    bannerImage: {
        width: "100%",
        height: 260,
        resizeMode: "cover",
    },

    imageOverlay: {
        position: "absolute",
        width: "100%",
        height: 260,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.45)",
        padding: 8,
        borderRadius: 40,
    },

    contentContainer: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        minHeight: "120%",
        elevation: 5,
    },

    title: {
        fontSize: FontSizes.xlarge,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
        marginBottom: 6,
    },

    dateText: {
        fontSize: FontSizes.small,
        fontFamily: "InterTight-Medium",
        color: COLORS.gray,
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: FontSizes.medium,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
        marginBottom: 10,
        marginTop: 10,
    },

    galleryImage: {
        width: 150,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
        resizeMode: "cover",
    },

    divider: {
        height: 1,
        backgroundColor: "#e5e5e5",
        marginVertical: 10,
    },

    noDesc: {
        fontSize: FontSizes.normal,
        color: COLORS.gray,
        fontFamily: "InterTight-Regular",
    },
});
