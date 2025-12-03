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
import RenderHTML from "react-native-render-html";   // ✅ ADDED

const { width } = Dimensions.get("window");

const ArticleScreen = () => {
    const navigation = useNavigation();
    const { token } = useSelector((state) => state.auth);

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, [token]);

    const fetchArticles = () => {
        commanServices
            .getArticles(token)
            .then((res) => setArticles(res.articles))
            .catch((err) => console.log("Articles API Error:", err))
            .finally(() => setLoading(false));
    };

    const onRefresh = () => {
        setRefreshing(true);
        commanServices
            .getArticles(token)
            .then((res) => setArticles(res.articles))
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
    // RENDER EACH BLOG ITEM
    // ----------------------------------------------------
    const renderBlog = ({ item }) => (
        <TouchableOpacity
            style={styles.blogCard}
            onPress={() => navigation.navigate("ArticleDetailScreen", { articlesId: item.slug })}
        >
            <View style={styles.blogContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.blogTitle}>{item.title}</Text>
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.blogImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={{ color: COLORS.textDark }}>No Image</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.blogDate}>{formatDate(item.created_at)}</Text>
                <View>
                    {/* 🔥 HTML Short Description */}
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
                                    marginTop: 10,
                                    lineHeight: 20,
                                },
                                
                            }}
                        />
                    ) : (
                        <Text style={styles.blogDesc}>No description available</Text>
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

                <Text style={styles.headerTitleAtten}>Articels</Text>

                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
            ) : articles.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 40, color: COLORS.textDark }}>
                    No Blogs Found
                </Text>
            ) : (
                <FlatList
                    data={articles}
                    renderItem={renderBlog}
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

    blogCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        padding: 10,
        flexDirection: "row",
        elevation: 1,
    },

    blogImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        resizeMode: "cover",

    },

    placeholderImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },

    blogContent: {
        flex: 1,
        marginLeft: 10,
    },

    blogTitle: {
        fontSize: 20,
        fontFamily: "Quicksand-Bold",
        color: COLORS.textDark,
        width: '70%',
        flexWrap: 'wrap',
    },

    blogDesc: {
        fontSize: 12,
        color: COLORS.gray,
        marginVertical: 4,
        fontFamily: "Quicksand-Medium",
    },

    blogDate: {
        fontSize: 12,
        color: COLORS.gray,
        fontFamily: "Quicksand-Medium",
    },
});

export default ArticleScreen;
