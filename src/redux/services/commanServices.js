import axios from 'axios';
import Toast from 'react-native-toast-message';

const authAxios = axios.create({
  baseURL: 'https://theschoolmate.in/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

// ---------------------------
// GET SLIDER IMAGES (SchoolMate)
// ---------------------------
const getSlider = async (token) => {
  console.log('line number 17 at common services', token);
  try {
   const res = await authAxios.get("/slider", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    // API returns: res.data.data = array of slider objects
    const sliderList = res.data.data || [];
console.log('sliderlist in common services',sliderList);
    // Convert to usable format
    const images = sliderList.map((item, index) => ({
      id: item.id,
      img: item.image_url,  // full URL from API
    }));
console.log('line 35 common services',images);
    return { images };
  } catch (error) {
    console.log("Slider API Error:", error);
    return { images: [] };
  }
};

// const getSchoolGallery = async (token) => {
//   try {
//     const res = await authAxios.get("/school-gallery", {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + token, // 🔥 REQUIRED
//       },
//     });
//     // Correct array from backend
//     const galleryList = res.data.data || [];
//     console.log("Gallery List From API:", galleryList);
//     // Convert to clean format for UI
//     const images = galleryList.map((item) => ({
//       id: item.id,
//       img: item.image_url,  // Full image URL from API
//     }));

//     return { images };

//   } catch (error) {
//     console.log("Gallery API Error:", error);
//     return { images: [] };
//   }
// };



const getSchoolGallery = async (token) => {
  try {
    const res = await authAxios.get("/school-gallery", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const galleryList = res.data.data || [];

    // 🔥 FILTER: Include Only Images (ignore videos)
    const images = galleryList
      .filter(item => item.image !== null && item.image_url)
      .map(item => ({
        id: item.id,
        img: item.image_url,
      }));
console.log("gallery line number 92", images);
    return { images };
    

  } catch (error) {
    console.log("Gallery API Error:", error);
    return { images: [] };
  }
};


const getBlogs = async (token) => {
  try {
    const res = await authAxios.get("/blogs", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token, // if API requires token
      },
    });
    const blogList = res.data.data || [];
    // Format for UI
    const blogs = blogList.map((item) => ({
      id: item.id,
      title: item.title ?? "Untitled Blog",
      slug: item.slug,
      short_desc: item.short_description ?? "",
      image: item.image_url ?? null,
      created_at: item.created_at ?? "",
    }));

    return { blogs };

  } catch (error) {
    console.log("Blog API Error:", error);
    return { blogs: [] };
  }
};


const getBlogDetail = async (token, blogId) => {
  try {
    console.log('blogDetails -- 132 & Token', token, blogId)
    const res = await authAxios.get(`/blog-detail/${blogId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return {
      blog: res.data.data,
      contentImages: res.data.contentImages || [],
    };

  } catch (error) {
    console.log("Blog Detail API Error:", error);
    return { blog: null, contentImages: [] };
  }
};

const getArticles = async (token) => {
  try {
    const res = await authAxios.get("/articles", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token, // if API requires token
      },
    });
    const articlesList = res.data.data || [];
    // Format for UI
    const articles = articlesList.map((item) => ({
      id: item.id,
      title: item.title ?? "Untitled Blog",
      slug: item.slug,
      short_desc: item.short_description ?? "",
      image: item.image_url ?? null,
      created_at: item.created_at ?? "",
    }));

    return { articles };

  } catch (error) {
    console.log("Articels API Error:", error);
    return { articles: [] };
  }
};


const getArticlesDetail = async (token, articlesId) => {
  try {
    // console.log('articles Details -- 182 & Token', token, blogId)
    const res = await authAxios.get(`/article-detail/${articlesId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return {
      article: res.data.data,
      contentImages: res.data.contentImages || [],
    };

  } catch (error) {
    console.log("Articles Detail API Error:", error);
    return { article: null, contentImages: [] };
  }
};



const getEvents = async (token) => {
  try {
    // Removed "Content-Type" header as it's generally unnecessary for GET requests (no body sent)
    const res = await authAxios.get("/events", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token, // Ensure this is needed. Often 'authAxios' implies an interceptor already handles this.
      },
    });

    // Renamed from articlesList to eventsList to match the function purpose
    const eventsList = res.data.data || [];

    // Format for UI
    // Renamed from articles to events
    const events = eventsList.map((item) => ({
      id: item.id,
      // Changed default from "Untitled Blog" to "Untitled Event"
      title: item.title ?? "Untitled Event",
      slug: item.slug,
      short_desc: item.short_description ?? "",
      // Ensure your UI can handle null if an image isn't provided
      image: item.image_url ?? null,
      created_at: item.created_at ?? "",
    }));

    // Returning key as 'events' instead of 'articles'
    return { events };

  } catch (error) {
    // Fixed typo: "Articels" -> "Events"
    console.log("Events API Error:", error);
    // Returning key as 'events' instead of 'articles'
    return { events: [] };
  }
};

// Get Event Detail API
const getEventDetail = async (token, eventId) => {
  try {
    const res = await authAxios.get(`/event-detail/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return {
      event: res.data.data,          // main event data
      contentImages: res.data.contentImages || [],  // images array
    };

  } catch (error) {
    console.log("Event Detail API Error:", error);
    return { event: null, contentImages: [] };
  }
};

// Get SchoolInfo 

const getSchoolInfo = async (token) => {
  try {
    const res = await authAxios.get("/school-info", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const info = res.data.data || {};
    // Format for UI
    const schoolInfo = {
      id: info.id ?? null,
      school_id: info.school_id ?? null,
      mobile1: info.mobile1 ?? "",
      mobile2: info.mobile2 ?? "",
      email: info.email ?? "",
      address: info.address ?? "",
      logo: info.image_url ?? null, // final full image URL
      schoolimage: info.school_image_url ?? null,
      schoolnamehindi: info.school_name_hindi ?? "",
      schoolnameeng: info.school_name_english ?? "",
      created_at: info.created_at ?? "",
      updated_at: info.updated_at ?? "",
    };

    return { schoolInfo };

  } catch (error) {
    console.log("School Info API Error:", error);
    return { schoolInfo: null };
  }
};

// ================================
// 📌 Get Attendance Summary
// ================================
const getAttendanceSummary = async (token) => {
  try {
    const res = await authAxios.get("/attendance-summery", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = res.data;
    // Format Data for UI safety
    const attendanceSummary = {
      student_id: data.student_id ?? null,
      session: data.session ?? "",
      attendance_percentage: data.attendance_percentage ?? 0,
      total_present: data.total_present ?? 0,
      total_days: data.total_days ?? 0,
      calendar: Array.isArray(data.calendar) ? data.calendar : [],
    };

    return { attendanceSummary };

  } catch (error) {
    console.log("Attendance Summary API Error:", error);
    return { attendanceSummary: null };
  }
};

// ================================
// 📌 Get Marks Summary API
// ================================
// const getMarksSummary = async (token) => {
//   try {
//     const res = await authAxios.get("/marks-summery", {
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + token,
//       },
//     });

//     const data = res.data || {};

//     // Safe formatted structure
//     const marksSummary = {
//       exams: Array.isArray(data.exams) ? data.exams : [],
//       exam: data.exam ?? null,
//       overall: data.overall ?? null,
//       subjects: Array.isArray(data.subjects) ? data.subjects : [],
//     };

//     return { marksSummary };

//   } catch (error) {
//     console.log("Marks Summary API Error:", error);
//     return { marksSummary: null };
//   }
// };




const getMarksSummary = async (token, exam_id = null) => {
  try {
    const url = exam_id
      ? `/marks-summery?exam_master_id=${exam_id}`
      : `/marks-summery`;

    const res = await authAxios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = res.data || {};

    return {
      marksSummary: {
        exams: Array.isArray(data.exams) ? data.exams : [],
        exam: data.exam || null,        // selected exam details
        overall: data.overall || null,  // same as exam summary but included
        subjects: Array.isArray(data.subjects) ? data.subjects : [],
      },
    };

  } catch (error) {
    console.log("Marks Summary API Error:", error);
    return { marksSummary: null };
  }
};


// ================================
// 📌 Get Today's Notifications
// ================================
const getNotifications = async (token) => {
  try {
    const res = await authAxios.get("/student/notifications/today", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = res.data || {};

    return {
      count: data.count || 0,
      notifications: (data.notifications || []).map(item => ({
        id: item.id,
        title: item.title,
        message: item.message,
        image: item.attachment_url
          ? "https://theschoolmate.in" + item.attachment_url
          : null,
        time: item.created_at,
        isNew: item.is_new,              // ⭐ changed from isRead → isNew
        delivery: item.delivery_status,
      })),
    };

  } catch (error) {
    console.log("Notifications API Error:", error);
    return { count: 0, notifications: [] };
  }
};


// ================================
// 📌 Get Fee Summary API
// ================================
const getFeeSummary = async (token) => {
  try {
    const res = await authAxios.get("/fees-summary", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = res.data || {};

    // Format Outstanding
    const outstanding = {
      total_fee: data.outstanding?.total_fee ?? "0",
      total_paid: data.outstanding?.total_paid ?? "0",
      total_due: data.outstanding?.total_due ?? 0,
      is_completed: data.outstanding?.is_completed ?? false,
    };

    // Format Paid History
    const paid_history = Array.isArray(data.paid_history)
      ? data.paid_history.map((item) => ({
          fee_head: item.fee_head ?? "",
          amount: item.amount ?? "0",
          paid_date: item.paid_date ?? "",
          status: item.status ?? "",
        }))
      : [];

    // Previous Pending Fees (if any)
    const previous_pending = Array.isArray(data.previous_pending)
      ? data.previous_pending
      : [];

    return {
      feeSummary: {
        outstanding,
        paid_history,
        previous_pending,
      },
    };

  } catch (error) {
    console.log("Fee Summary API Error:", error);
    return { feeSummary: null };
  }
};




// ================================
// 📌 Get Activities List
// ================================
const getActivities = async (token) => {
  try {
    const res = await authAxios.get("/activity", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // if required
      },
    });

    const activityList = res.data.data || [];

    // Format for UI
    const activities = activityList.map((item, index) => ({
      id: index + 1,                         // API does not send ID
      slug: item.slug ?? "",                 // activity slug
      title: item.title ?? "Untitled Activity",
      short_desc: item.short_description ?? "",
      cover_image: item.image_url ?? null,   // safe image
      created_at: item.created_at ?? "",
    }));

    return { activities };

  } catch (error) {
    console.log("Activity API Error:", error);
    return { activities: [] };
  }
};


// ================================
// 📌 Get Activity Detail
// ================================
const getActivitiesDetail = async (token, slug) => {
  try {
    const res = await authAxios.get(`/activity-detail/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return {
      activityDetail: res.data.data || null,
      contentImages: res.data.contentImages || [],
    };

  } catch (error) {
    console.log("Activity Detail API Error:", error);
    return { activityDetail: null, contentImages: [] };
  }
};

// ================================
// 📌 Submit Feedback
// ================================
const submitFeedback = async (token, payload) => {
  try {
    const res = await authAxios.post(
      "/feedback-submit",
      {
        problem_type: payload.problem_type,
        feedback_text: payload.feedback_text,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return {
      success: true,
      message: res.data.message || "Submitted",
      feedback: res.data.data || null,
    };

  } catch (error) {
    console.log("Feedback Submit API Error:", error);

    return {
      success: false,
      message: "Something went wrong",
      feedback: null,
    };
  }
};

// ================================
// 📌 Get My Feedback History
// ================================
const getFeedbackHistory = async (token) => {
  try {
    const res = await authAxios.get("/my-feedbacks", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const list = res.data.data || [];

    // Format clean structure for UI
    const feedbackHistory = list.map((item) => ({
      id: item.id,
      problem_type: item.problem_type ?? "",
      description: item.feedback_text ?? "",
      status: item.status === "1" ? "Solved" : "Pending",
      date: item.created_at ? new Date(item.created_at).toDateString() : "",
    }));

    return { feedbackHistory };

  } catch (error) {
    console.log("Feedback History API Error:", error);
    return { feedbackHistory: [] };
  }
};







const showToast = Message => {
  Toast.show({
    type: 'success',
    text1: Message,
    visibilityTime: 5000,
  });
};

const commanServices = {
  showToast,
  getSlider,
  getSchoolGallery,
  getBlogs,
  getBlogDetail,
  getArticles,
  getArticlesDetail,
  getEvents,
  getEventDetail,
  getSchoolInfo,
  getAttendanceSummary,
  getMarksSummary,
  getNotifications,
  getFeeSummary,
  getActivities,
  getActivitiesDetail,
  submitFeedback,
  getFeedbackHistory
};
export default commanServices;