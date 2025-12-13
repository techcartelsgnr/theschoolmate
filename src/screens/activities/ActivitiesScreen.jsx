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
import { COLORS, FontSizes } from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import commanServices from "../../redux/services/commanServices";
import RenderHTML from "react-native-render-html";

const { width } = Dimensions.get("window");

const ActivitiesScreen = () => {
    const navigation = useNavigation();
    const { token } = useSelector((state) => state.auth);

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchActivities();
    }, [token]);

    const fetchActivities = () => {
        commanServices
            .getActivities(token)
            .then((res) => setActivities(res.activities))
            .catch((err) => console.log("Activities API Error:", err))
            .finally(() => setLoading(false));
    };

    const onRefresh = () => {
        setRefreshing(true);
        commanServices
            .getActivities(token)
            .then((res) => setActivities(res.activities))
            .finally(() => setRefreshing(false));
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

    // ----------------------------------------------------
    // RENDER ACTIVITY ITEM
    // ----------------------------------------------------
    const renderActivity = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("ActivitiesDetailScreen", { slug: item.slug })
            }
        >
            {/* Image */}
            <Image
                source={{ uri: item.cover_image }}
                style={styles.cardImage}
            />

            {/* Content */}
            <View style={styles.cardBody}>
                <Text style={styles.cardDate}>{formatDate(item.created_at)}</Text>

                <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.title}
                </Text>

                {/* Short HTML description */}
                {item.short_desc ? (
                    <RenderHTML
                        contentWidth={width - 50}
                        source={{ html: item.short_desc }}
                        defaultTextProps={{ numberOfLines: 2 }}
                        tagsStyles={{
                            p: {
                                fontFamily: "InterTight-Regular",
                                fontSize: FontSizes.small,
                                color: COLORS.gray,
                                lineHeight: 20,
                                marginTop: 6,
                            },
                        }}
                    />
                ) : (
                    <Text style={styles.cardDesc}>No description available</Text>
                )}

                <Text style={styles.readMore}>Read More →</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Activities</Text>

                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                    style={{ marginTop: 40 }}
                />
            ) : activities.length === 0 ? (
                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 40,
                        color: COLORS.textDark,
                        fontFamily: "InterTight-Medium",
                    }}
                >
                    No Activities Found
                </Text>
            ) : (
                <FlatList
                    data={activities}
                    renderItem={renderActivity}
                    keyExtractor={(item, index) =>
                        item.id ? item.id.toString() : index.toString()
                    }
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 15 }}
                />
            )}
        </SafeAreaView>
    );
};

// ----------------------------------------------------

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.lightGray || "#f6f7fb" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.whiteBackground,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },

    headerTitle: {
        fontSize: FontSizes.normal,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
    },

    /* ----------------- CARD UI IMPROVED ----------------- */

    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        overflow: "hidden",
    },

    cardImage: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
    },

    cardBody: {
        padding: 15,
    },

    cardDate: {
        fontSize: FontSizes.xsmall,
        color: COLORS.gray,
        fontFamily: "InterTight-Medium",
    },

    cardTitle: {
        fontSize: 19,
        color: COLORS.textDark,
        fontFamily: "Quicksand-Bold",
        marginTop: 5,
    },

    cardDesc: {
        fontSize: FontSizes.small,
        color: COLORS.gray,
        marginTop: 6,
        fontFamily: "InterTight-Regular",
    },

    readMore: {
        marginTop: 10,
        fontSize: FontSizes.small,
        fontFamily: "Quicksand-Bold",
        color: COLORS.primary,
    },
});

export default ActivitiesScreen;
