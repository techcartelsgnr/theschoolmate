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
};
export default commanServices;