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

  // Date
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Time
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 -> 12

  return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
};


const ArticleDetailScreen = ({ route, navigation }) => {
    const { articlesId } = route.params; // slug passed from Article list
    const { token } = useSelector(state => state.auth);

    const [article, setArticle] = useState(null);
    const [contentImages, setContentImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // -----------------------------------
    // API CALL
    // -----------------------------------
    const loadArticleDetail = () => {
        return commanServices
            .getArticlesDetail(token, articlesId)
            .then(res => {
                setArticle(res.article);
                setContentImages(res.contentImages);
            });
    };

    useEffect(() => {
        loadArticleDetail().finally(() => setLoading(false));
    }, []);

    // -----------------------------------
    // Pull to Refresh
    // -----------------------------------
    const onRefresh = () => {
        setRefreshing(true);
        loadArticleDetail().finally(() => setRefreshing(false));
    };

    // -----------------------------------
    // Loading Screen
    // -----------------------------------
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.success} />
            </View>
        );
    }

    // -----------------------------------
    // Error or Not Found
    // -----------------------------------
    if (!article) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={{ color: COLORS.textDark }}>Article not found</Text>
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
                {/* <Text style={styles.headerTitle}>Article Detail</Text> */}
                <View style={{ width: 26 }} />
            </View>

            {/* SCROLL CONTENT */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.success]} />
                }
            >
                <Text style={styles.title}>{article.title}</Text>
                <View style={styles.articleTag}>
                    <Text style={styles.articleType}>{article.type}</Text>
                    <Text style={styles.articleDate}>{formatDate(article.created_at)}</Text>
                </View>

                {/* COVER IMAGE */}
                {article.image_url && (
                    <Image source={{ uri: article.image_url }} style={styles.coverImage} />
                )}

                {/* FULL DESCRIPTION */}
                {article.full_description && (
                    <RenderHTML
                        contentWidth={width}
                        source={{ html: article.full_description }}
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
// Styles
// -----------------------------------
const styles = StyleSheet.create({
    container: { flex: 1 },
    loaderContainer: {
        flex: 1, justifyContent: "center", alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        // backgroundColor: COLORS.whiteBackground,
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: FontSizes.medium,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
    },
    coverImage: {
        width: width,
        height: 230,
        resizeMode: "cover",
        marginTop: 10,
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
    articleTag:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.accent,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    articleType:{
        fontSize: FontSizes.xsmall,
        fontFamily: "InterTight-Bold",
        color: COLORS.textPrimary,
        backgroundColor: COLORS.background,
        paddingHorizontal: 5,
        paddingVertical: 5,
        textTransform: 'capitalize',
    },
    articleDate:{
        fontSize: FontSizes.xsmall,
        fontFamily: "InterTight-Bold",
        color: COLORS.textDark,
    },
});

export default ArticleDetailScreen;
