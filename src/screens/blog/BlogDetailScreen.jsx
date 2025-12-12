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

const BlogDetailScreen = ({ route, navigation }) => {
    const { blogId } = route.params;
    const { token } = useSelector(state => state.auth);

    const [blog, setBlog] = useState(null);
    const [contentImages, setContentImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadBlogDetail = () => {
        return commanServices
            .getBlogDetail(token, blogId)
            .then(res => {
                setBlog(res.blog);
                setContentImages(res.contentImages);
            });
    };

    useEffect(() => {
        loadBlogDetail().finally(() => setLoading(false));
    }, []);

    // 🔄 Pull to Refresh
    const onRefresh = () => {
        setRefreshing(true);
        loadBlogDetail().finally(() => setRefreshing(false));
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.success} />
            </View>
        );
    }

    if (!blog) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={{ color: COLORS.textDark }}>Blog not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Blog Detail</Text>
                <View style={{ width: 26 }} />
            </View>

            {/* 🔄 ScrollView with Pull to Refresh */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.success]}
                    />
                }
            >
                {/* COVER IMAGE */}
                {blog.image_url && (
                    <Image source={{ uri: blog.image_url }} style={styles.coverImage} />
                )}

                {/* TITLE */}
                <Text style={styles.title}>{blog.title}</Text>

                {/* SHORT DESCRIPTION */}
                {blog.short_description && (
                    <RenderHTML
                        contentWidth={width}
                        source={{ html: blog.short_description }}
                        tagsStyles={{
                            p: {
                                fontFamily: "InterTight-Bold",
                                fontSize: 13,
                                color: COLORS.gray,
                                marginTop: 10,
                                paddingHorizontal: 15,
                                lineHeight: 20,
                            },
                            b: {
                                fontWeight: "800",
                            },
                            span: {
                                fontWeight: "500",
                                backgroundColor: COLORS.primaryGradientEnd,
                            },
                            strong: {
                                fontWeight: "900",
                            },
                            i: {
                                fontFamily: "Quicksand-Medium",
                            },
                            u: { textDecorationLine: "underline" },
                        }}
                        classesStyles={{}}
                        enableExperimentalFeatures
                        renderersProps={{
                            text: {
                                allowFontScaling: false,
                            },
                        }}
                    />
                )}

                {/* FULL DESCRIPTION */}
                {blog.full_description && (
                    <RenderHTML
                        contentWidth={width}
                        source={{ html: blog.full_description }}
                        tagsStyles={{
                            p: {
                                fontFamily: "InterTight-Bold",
                                fontSize: FontSizes.small,
                                color: COLORS.gray,
                                marginTop: 10,
                                paddingHorizontal: 15,
                                lineHeight: 20,
                            },
                            b: {
                                fontWeight: "800",
                            },
                            span: {
                                fontWeight: "500",
                                backgroundColor: COLORS.primaryGradientEnd,
                            },
                            strong: {
                                fontWeight: "900",
                            },
                            i: {
                                fontFamily: "Quicksand-Medium",
                            },
                            u: { textDecorationLine: "underline" },
                        }}
                        classesStyles={{}}
                        enableExperimentalFeatures
                        renderersProps={{
                            text: {
                                allowFontScaling: false,
                            },
                        }}
                    />
                )}

                {/* CONTENT IMAGES */}
                {contentImages.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.subHeader}>More Images</Text>

                        {contentImages.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img.image_url }}
                                style={styles.contentImage}
                            />
                        ))}
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

// -----------------------------------

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: COLORS.whiteBackground,
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: FontSizes.medium,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
    },
    loaderContainer: {
        flex: 1, justifyContent: "center", alignItems: "center",
    },
    coverImage: {
        width: width, height: 230, resizeMode: "cover",
    },
    title: {
        fontSize: FontSizes.medium,
        fontFamily: "Quicksand-Bold",
        marginTop: 12,
        paddingHorizontal: 14,
        color: COLORS.textDark,
    },
    subHeader: {
        fontSize: FontSizes.normal,
        fontFamily: "Quicksand-Bold",
        paddingHorizontal: 15,
        marginBottom: 10,
        color: COLORS.textDark,
    },
    contentImage: {
        width: width - 30,
        height: 200,
        resizeMode: "cover",
        borderRadius: 12,
        marginBottom: 15,
        alignSelf: "center",
    },
});

export default BlogDetailScreen;
