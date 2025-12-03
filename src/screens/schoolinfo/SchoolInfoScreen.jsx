import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    StatusBar,
    Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { fetchSchoolInfo } from "../../redux/slices/commonSlice";
import { COLORS } from "../../theme/theme";

const SchoolInfoScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const { schoolInfo, loading } = useSelector((state) => state.common);
    const { token } = useSelector((state) => state.auth);

    // Refresh Handler
    const onRefresh = () => {
        if (token) dispatch(fetchSchoolInfo(token));
    };

    // ⛔ FIXED: Show loader ONLY if first load AND no data
    if (loading && !schoolInfo) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.cardBackground} />
            </View>
        );
    }

    if (!schoolInfo) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={{ color: COLORS.textDark }}>School Info Not Found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.cardBackground} barStyle="light-content" />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>School Info</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* CONTENT */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                        colors={[COLORS.cardBackground]}
                    />
                }
            >
                {/* LOGO SECTION */}
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: schoolInfo.logo }}
                        style={styles.schoolLogo}
                    />
                    <Text style={styles.schoolName}>The SchoolMate</Text>
                </View>

                {/* INFO CARD */}
                <View style={styles.infoCard}>
                    {/* Email */}
                    <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={20} color={COLORS.cardBackground} />
                        <View style={styles.infoTextBox}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{schoolInfo.email}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Mobile 1 */}
                    <View style={styles.infoRow}>
                        <Ionicons name="call-outline" size={20} color={COLORS.cardBackground} />
                        <TouchableOpacity
                            style={styles.infoTextBox}
                            onPress={() => Linking.openURL(`tel:${schoolInfo.mobile1}`)}
                        >
                            <Text style={styles.infoLabel}>Mobile 1</Text>
                            <Text style={[styles.infoValue, { color: COLORS.cardBackground }]}>
                                {schoolInfo.mobile1}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mobile 2 */}
                    {schoolInfo.mobile2 ? (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Ionicons name="call-outline" size={20} color={COLORS.cardBackground} />
                                <TouchableOpacity
                                    style={styles.infoTextBox}
                                    onPress={() => Linking.openURL(`tel:${schoolInfo.mobile2}`)}
                                >
                                    <Text style={styles.infoLabel}>Mobile 2</Text>
                                    <Text style={[styles.infoValue, { color: COLORS.cardBackground }]}>
                                        {schoolInfo.mobile2}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : null}

                    <View style={styles.divider} />

                    {/* Address */}
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color={COLORS.cardBackground} />
                        <View style={styles.infoTextBox}>
                            <Text style={styles.infoLabel}>Address</Text>
                            <Text style={styles.infoValue}>{schoolInfo.address}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.whiteBackground },

    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    /** HEADER **/
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
        fontSize: 18,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
    },

    /** LOGO **/
    logoContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 15,
    },
    schoolLogo: {
        width: 110,
        height: 110,
        
    },
    schoolName: {
        fontSize: 20,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
        marginTop: 10,
    },

    /** INFO CARD **/
    infoCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 14,
        padding: 15,
        borderWidth: 1,
        borderColor: '#eeeeee',
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoTextBox: {
        marginLeft: 10,
        flex: 1,
    },

    infoLabel: {
        fontSize: 12,
        fontFamily: "InterTight-Medium",
        color: COLORS.textDark,
        opacity: 0.6,
    },
    infoValue: {
        fontSize: 15,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
        marginTop: 0,
    },

    divider: {
        height: 1,
        backgroundColor: "#eeeeee",
        marginVertical: 12,
    },
});

export default SchoolInfoScreen;
