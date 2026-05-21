import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPage = async () => {
            try {
                // Biz faqat foydalanuvchi portfoliolari bo'lmagan sahifalarni ham kuzatishimiz kerak
                // Portfolio sahifalarida o'zining tracking logikasi bor, lekin biz umumiy trackingni ham qo'shamiz
                await api.post('/visitor/report', {
                    page: location.pathname,
                    user: null // Umumiy platforma tashrifi
                });
            } catch (err) {
                // Xatolikni indamay o'tkazib yuboramiz, bu asosiy funksionallikka halaqit bermasligi kerak
                console.error("Tracking error:", err);
            }
        };

        trackPage();
    }, [location]);
};

export default usePageTracking;
