import { Star, TrendingUp } from "@mui/icons-material";
import { Box,Typography } from "@mui/material";
import { Clock, Filter, MapPin, Search, Tag, User } from 'lucide-react';
import NavBar from "./navbar";
import { useState } from "react";
import Page6 from "./Page6";
import { HorMotion, Motion } from "./motion";
import { useNavigate } from "react-router";
import {useQuery} from "@tanstack/react-query"

function Services ({searchTerm, setSearchTerm}){

    const [selectedCategory, setSelectedCategory] = useState("All")
    const navigate = useNavigate()
  
    const { data : serviceProviders} = useQuery({
      queryKey: ["service"],
      queryFn: () => 
        fetch("https://webservice-db-58ug.onrender.com/serviceproviders").then(res => 
          res.json()
        ),
    })

    const filtered = () => {
      let filteredData = serviceProviders;
    
      if (searchTerm) {
        filteredData = filteredData?.filter(item =>
          item.more_details?.some(detail =>
            detail.jobTitle.toLowerCase().includes((searchTerm).toLowerCase())
          )
        );
      }
    
      if (selectedCategory !== "All") {
        filteredData = filteredData?.filter(item =>
          item.more_details?.some(detail =>
            detail.category.toLowerCase() === selectedCategory.toLowerCase()
          )
        );
      }
    
      return filteredData;
    };
    

    const services = filtered()

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

    const categories = ["Auto Services", "Electrical", "Home Services", "Maintenance", "Outdoor"]

    function handleDetails(id){
      navigate(`/details/${id}`)
    }

    return ( 
       <div>
            <Box>
                <NavBar/>
            </Box>

            <Box sx={{ height: { xs: '90px', md: '90px' } }} />

            <HorMotion>
              <Box pb={'10px'}>
                <Typography fontFamily={"DM Medium"} textAlign={'center'} color="white" fontSize={{md:'40px', xs:'30px'}}>All Services</Typography>
              </Box>
            </HorMotion>

            {/* Search Bar */}
            <div className="flex flex-col mb-12 gap-6">

              <Motion>
              <div className="relative max-w-md mx-auto w-full px-4">
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search professionals..."
                  className="w-full pl-10 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-gray-400 focus:bg-white/20 transition-all duration-300"
                />
              </div>
              </Motion>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-3 justify-center items-center px-3">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Motion>
                    <Filter className="w-4 h-4"/>
                  </Motion>

                  <Motion>
                    <span>Filter by:</span>
                  </Motion>
                </div>

                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                    selectedCategory === "All"
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 shadow-lg shadow-emerald-500/30'
                      : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  All
                </button>

                {categories.map((category,index) => (
                  <HorMotion index={index} key={index}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-md px-4 py-2 text-sm transition-all duration-300 ${
                        selectedCategory === category
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 shadow-lg shadow-emerald-500/30'
                        : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  </HorMotion>
                ))}
                
              </div>

              <div className="items-center flex justify-center">
                <h3 className="text-slate-300">{services?.length} Service {services?.length > 1 ? "Providers" : "Provider"}</h3>
              </div>
            </div>



            <Box
                display={'grid'}
                gridTemplateColumns={{md:"repeat(4,1fr)"}}
                gap={'30px'}
                pb={'40px'}
                px={{xs:2, md:20}}
            >

                {services?.map((service, index) => (
                    <div 
                        className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-6 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                    {/* Floating gradient orb */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Image section */}
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                      <img
                        src={imageArray[(service.id) - 1]}
                        alt={service.jobTitle}
                        className="w-full h-64 object-cover  transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {service.more_details && service.more_details.map((item, i) => (
                        <div key={i} className="absolute top-3 right-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 text-sm font-medium text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" >
                          <Tag className="w-3 h-3"/>
                          {item.category}
                        </div>
                      ))}
                      
                      
                      {/* Rating badge */}
                      {service.more_details && service.more_details.map((detail, i)  => (
                        <div key={i} className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium text-gray-800 transform -translate-y-9.5 group-hover:translate-y-0 transition-transform duration-300">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {detail.rating}
                        </div>
                      ))}

                    </div>
              
                    {/* Content section */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-300">
                                <User className="w-4 h-4"/>
                                <span className="text-lg font-semibold group-hover:text-emerald-200 transition-colors duration-300">
                                    {service.display_name}
                                </span>
                            </div>

                            {service.more_details && service.more_details.map((detail,i) => (
                              <h3 key={i} className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                                  {detail.jobTitle}
                              </h3>
                            ))}

                        </div>
                    
                      {service.more_details && service.more_details.map((detail, i) => (
                        <p key={i} className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                          {detail.description}
                        </p>
                      ))}

              
                      {/* Meta information */}
                      {service.more_details && service.more_details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs text-gray-400">
                          {detail.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {detail.location}
                            </div>
                          )}
                          {detail.responseTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {detail.responseTime}
                            </div>
                          )}
                        </div>
                      ))}

              
                      {/* Stats section */}
                      {service.more_details && service.more_details.map((detail,i) => (
                        <div key={i} className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {detail.payRate}
                          </div>
                          
                          <div className="flex items-center gap-2 text-emerald-400">
                            <div className="flex items-center gap-1 bg-emerald-500/20 rounded-full px-3 py-1">
                              <TrendingUp className="w-4 h-4 animate-pulse" />
                              <span className="text-sm font-medium">{detail.completionRate}</span>
                            </div>
                          </div>
                        </div>
                      ))}

              
                      {/* Action button */}
                        <button onClick={() => handleDetails(service.id)} className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}

            </Box>

            <div>
              <Page6/>
            </div>
       </div>
     );
}
 
export default Services;