import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FontSizes } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

export default function NoticeBoard() {
    const navigation = useNavigation();

    // Sample Notices
    const notices = [
        {
            id: 1,
            title: 'Holiday Announcement',
            date: '25 Nov 2025',
            time: '10:30 AM',
            message:
                'Dear students, the school will remain closed tomorrow due to heavy rain. Please stay safe and avoid unnecessary travel.',
        },
        {
            id: 2,
            title: 'Science Fair',
            date: '22 Nov 2025',
            time: '01:15 PM',
            message:
                'The annual science fair will be held next week. All participants must submit their project summary by Friday. Parents are also invited to the event.',
        },
        {
            id: 3,
            title: 'Fees Reminder',
            date: '20 Nov 2025',
            time: '08:45 AM',
            message:
                'Parents are requested to clear the pending fees before the end of this month to avoid any inconvenience. Kindly ignore if already paid.',
        },
    ];

    const [expandedId, setExpandedId] = useState(null);

    const renderItem = ({ item }) => {
        const isExpanded = expandedId === item.id;

        return (
            <View style={styles.noticeCard}>
                <Text style={styles.noticeTitle}>{item.title}</Text>

                <Text style={styles.noticeDateTime}>
                    {item.date} • {item.time}
                </Text>

                {/* Collapsible Message */}
                <Text
                    style={styles.noticeMessage}
                    numberOfLines={isExpanded ? null : 3}
                >
                    {item.message}
                </Text>

                {/* Read More / Less */}
                <TouchableOpacity
                    onPress={() =>
                        setExpandedId(isExpanded ? null : item.id)
                    }
                >
                    <Text style={styles.readMoreText}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.whiteBackground} barStyle="dark-content" />

            <View style={{ flex: 1, backgroundColor: COLORS.whiteBackground }}>

                {/* Header */}
                <View style={styles.headerAtten}>
                    <TouchableOpacity
                        style={styles.backButtonAtten}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleAtten}>Notice Board</Text>
                    <View style={{ width: '15%' }} />
                </View>

                {/* Notice List */}
                <FlatList
                    data={notices}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 15, paddingBottom: 40 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerAtten: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.whiteBackground,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButtonAtten: { padding: 4 },
    headerTitleAtten: {
        fontSize: FontSizes.normal,
        fontFamily: 'Quicksand-Bold',
        color: COLORS.textDark,
    },

    /* Notice Card */
    noticeCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 1,
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
    },
    noticeTitle: {
        fontSize: 17,
        color: '#1c2b3a',
        fontFamily: 'Quicksand-Bold',
        marginBottom: 5,
    },
    noticeDateTime: {
        fontSize: 13,
        color: '#6c7a89',
        fontFamily: 'Quicksand-Medium',
        marginBottom: 8,
    },
    noticeMessage: {
        fontSize: FontSizes.small,
        color: '#444',
        fontFamily: 'Quicksand-Medium',
        lineHeight: 20,
    },
    readMoreText: {
        marginTop: 8,
        color: COLORS.primary || '#1e40af',
        fontFamily: 'Quicksand-Bold',
        fontSize: FontSizes.small,
    },
});

