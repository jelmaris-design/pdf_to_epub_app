import React from 'react';
import { ArrowLeft, Smartphone, Zap, Shield, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyUs = ({ onBack }) => {
    const reasons = [
        {
            icon: Smartphone,
            title: 'Mobil Özgürlük',
            description: 'PC\'ye ihtiyaç yok! Telefonunuzdan anında dönüştürün, istediğiniz yerde okuyun.',
            color: 'text-teal-600 bg-teal-50'
        },
        {
            icon: Zap,
            title: 'Hızlı & Kolay',
            description: 'Karmaşık ayarlar yok. 3 dokunuşta PDF\'iniz EPUB\'a dönüşür.',
            color: 'text-yellow-600 bg-yellow-50'
        },
        {
            icon: Shield,
            title: 'Gizlilik Öncelikli',
            description: 'Dosyalarınız cihazınızda kalır. Sunucularımızda saklanmaz.',
            color: 'text-blue-600 bg-blue-50'
        },
        {
            icon: Heart,
            title: 'Kindle Entegrasyonu',
            description: 'Direkt Kindle\'ınıza gönderin. Email ile uğraşmaya son!',
            color: 'text-pink-600 bg-pink-50'
        },
        {
            icon: Sparkles,
            title: 'Profesyonel Kalite',
            description: 'API destekli dönüşüm ile en yüksek kalitede EPUB dosyaları.',
            color: 'text-purple-600 bg-purple-50'
        },
        {
            icon: TrendingUp,
            title: 'Sürekli Gelişim',
            description: 'Düzenli güncellemeler ve yeni özelliklerle her zaman daha iyi.',
            color: 'text-green-600 bg-green-50'
        }
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center gap-2">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Neden Biz?</h2>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-y-auto space-y-3 pb-4"
            >
                <p className="text-sm text-gray-600 mb-4">
                    Masaüstü programlar ve web siteleri varken neden mobil uygulamamızı tercih etmelisiniz?
                </p>

                {reasons.map((reason, index) => {
                    const Icon = reason.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex gap-3">
                                <div className={`p-3 rounded-lg ${reason.color} shrink-0`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">{reason.title}</h3>
                                    <p className="text-sm text-gray-600">{reason.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                <div className="bg-gradient-to-r from-teal-50 to-pink-50 p-4 rounded-xl mt-6">
                    <h3 className="font-bold text-gray-800 mb-2">💡 Bonus</h3>
                    <p className="text-sm text-gray-600">
                        Ücretsiz versiyonla başlayın, beğenirseniz premium'a geçin.
                        Hiçbir zorunluluk yok, sadece siz karar verin!
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default WhyUs;
