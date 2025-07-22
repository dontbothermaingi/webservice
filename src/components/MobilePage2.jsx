import { ArrowRight} from "@mui/icons-material";
import { Card, CardContent} from "@mui/material";
import { Clock, Star, TrendingUp, Users, Zap } from "lucide-react";
import { HorMotion, Motion } from "./motion";
import { useNavigate } from "react-router";
import {useQuery} from "@tanstack/react-query"

function MobilePage2 (){

    // const [serviceProviders, setServiceProviders] = useState([])
    const navigate = useNavigate()

    const {data: serviceProviders} = useQuery({
        queryKey:["service_providers"],
        queryFn:() => 
          fetch("https://webservice-db-58ug.onrender.com/serviceproviders").then(res =>
            res.json()
          )
    })

    const imageArray = [
        "/wow.jpg",
        "/bob.jpg",
        "/mary.jpg",
        "/john.jpg",
        "/njoki.jpg",
        "/mec.jpg",
        "/grace.jpg",
        "/hnry.jpg",
        "/home.jpg",
        "/web.jpg",
        "/ppc.jpg",
        "/carp.jpg",
        "/yoga.jpg",
        "/tech.jpg",
        "/make up.jpg",
        "/15.jpg",
        "/17.jpg",
        "/18.jpg",
        "/19.jpg",
        "/20.jpg",
        "/21.jpg",
    ];

    const services = [
        {
            image:"/webdev.jpg",
            category:"Web Developer",
            title:"Software Engineer",
            description:"I’m a passionate website developer with a focus on creating modern, responsive, and user-friendly websites.",
            time:"2 Weeks",
            price:200,
            rating:4.2,
            isPopular:'true'

        }, 
        {
            image:"/mec.jpg",
            category:"Mechanic",
            title:"Automotive Specialist",
            description:"A highly skilled mechanic offering professional diagnostics, repairs, and maintenance services for a wide range of vehicles.",
            time:"3 Days",
            price:150,
            rating:4.7

        },
        {
            image:"/market.jpg",
            category:"Digital Marketer",
            title:"Marketing Expert",
            description:"A results-driven digital marketing specialist who helps businesses enhance their online presence, build strong brand identities, and reach new audiences.",
            time:"1 Week",
            price:300,
            rating:4.9,
            isPopular:'true'
        }
    ]

    function handleDetails(id){
        navigate(`/details/${id}`)
    }

    return ( 
        <div className="px-4 py-8">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col text-center ">

        <Motion index={1}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-blue-300 font-medium">Limited Time Offer</span>
            </div>
        </Motion>
        
        <Motion index={2}>
            <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
            Become
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> In-Demand </span>
            On The Job Market
            <span className="text-yellow-400"> Today!</span>
            </h1>
        </Motion>
        
        <Motion index={3}>
        <p className="text-slate-300 text-sm leading-relaxed">
          Join thousands of professionals earning 6-figure incomes with our proven marketplace
        </p>
        </Motion>
      </div>

        {/* Stats Section */}
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4 mb-8">
            <HorMotion index={1}>
            <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xl font-bold text-white">50K+</span>
                </div>
                <p className="text-xs text-slate-400">Active Users</p>
            </div>
            </HorMotion>

            <HorMotion index={2}>
            <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xl font-bold text-white">$2M+</span>
                </div>
                <p className="text-xs text-slate-400">Earned Monthly</p>
            </div>
            </HorMotion>

            <HorMotion index={3}>
            <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                    <Star className="w-4 h-4" />
                    <span className="text-xl font-bold text-white">4.9</span>
                </div>
                <p className="text-xs text-slate-400">Average Rating</p>
            </div>
            </HorMotion>
        </div>

        {/* Service Cards */}
        <div className="max-w-md mx-auto space-y-4 mb-8">
            {serviceProviders?.slice(0,3).map((service, index) => (
            <Motion index={index} key={index}>
                <Card 
                    className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:shadow-xl hover:shadow-blue-500/10"
                    // onMouseEnter={() => handleCardHover(service.id)}
                    // onMouseLeave={() => handleCardHover(null)}
                >
                    <CardContent className="p-4">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2">
                            {service.more_details && service.more_details.map((detail,i) => (
                                <span key={i} className="bg-slate-700/50 text-slate-100 text-xs px-3 py-1 rounded-full font-medium">
                                    {detail.category}
                                </span>
                            ))}
                        
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                            🔥 Hot
                        </span>
                        </div>

                        {service.more_details && service.more_details.map((detail,i) => (
                            <div key={i} className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs font-medium">{detail.rating}</span>
                            </div>
                        ))}
                        
                    </div>

                    {/* Service Image */}
                    <div className="w-full h-32 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img 
                        src={imageArray[(service.id) -1]} 
                        alt={"image"}
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Service Info */}
                    {service.more_details && service.more_details.map((detail,i) => (
                        <h3 key={i} className="text-black font-bold text-lg mb-2">{detail.jobTitle}</h3>
                    ))}
                    
                    <p className="text text-sm mb-3 leading-relaxed">{services && services[(service?.id) - 1].description}</p>

                    {/* Duration */}
                    {service.more_details && service.more_details.map((detail,i) => (
                        <div key={i} className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-slate-800" />
                            <span className="text-sm text-slate-800">{detail.responseTime}</span>
                        </div>
                    ))}
                    

                    {/* Price and CTA */}
                    {service.more_details && service.more_details.map((detail,i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-green-400">
                                {detail.payRate}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleDetails(service.id)}
                                className="group inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                            <span className="text-sm font-semibold">View Details</span>
                            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                        </div>
                    ))}
                    
                    </CardContent>
                </Card>
            </Motion>
            ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-md mx-auto space-y-4">
            {/* Primary CTA */}
            <Motion>
                <button
                    onClick={() => navigate("/register")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="flex items-center justify-center gap-2 relative z-10">
                    <span className="text-base">🚀 Join as Customer</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                </button>
            </Motion>

            {/* Secondary CTA */}
            <HorMotion>
                <button
                    variant="outline"
                    onClick={() => navigate("/register")}
                    className="w-full border-2 border-slate-600 text-white hover:bg-white hover:text-slate-900 font-bold py-4 rounded-xl transition-all duration-300 group hover:border-white hover:shadow-lg transform hover:scale-[1.02]"
                >
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-base">💼 Join as Professional</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </button>
            </HorMotion>

            {/* Trust Indicators */}
            <div className="text-center mt-6 space-y-2">
                <Motion>
                    <p className="text-xs text-slate-400">✅ No setup fees • ✅ 30-day money back • ✅ 24/7 support</p>
                </Motion>

                <Motion>
                    <p className="text-xs text-slate-500">Join 50,000+ satisfied customers worldwide</p>
                </Motion>
            </div>
        </div>
    </div>
     );
}
 
export default MobilePage2;