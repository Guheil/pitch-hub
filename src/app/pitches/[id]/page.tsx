"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Card3d } from "@/components/ui/3d-card";
import {
  IconArrowLeft,
  IconEye,
  IconHeart,
  IconCalendar,
  IconShare,
  IconBookmark,
  IconBulb,
  IconTarget,
  IconUsers,
  IconVideo,
  IconPhoto,
  IconArrowRight,
} from "@tabler/icons-react";

// Define types for our components
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

type PitchImage = string;

// Extended mock data for detailed pitch view
const DETAILED_PITCHES = [
  {
    id: "1",
    title: "EcoDelivery",
    description: "Sustainable last-mile delivery service using electric vehicles and optimized routes to reduce carbon footprint.",
    fullDescription: "EcoDelivery is revolutionizing the last-mile delivery industry with a focus on sustainability and efficiency. Our platform connects eco-conscious consumers with local businesses through a network of electric vehicle drivers and optimized delivery routes.\n\nBy leveraging advanced route optimization algorithms and a fleet of electric vehicles, we reduce carbon emissions by up to 75% compared to traditional delivery services. Our platform also provides real-time tracking and delivery estimates, ensuring a seamless experience for both businesses and consumers.",
    category: "Sustainability",
    views: 1245,
    likes: 89,
    createdAt: new Date(2023, 10, 15),
    author: "Alex Johnson",
    authorAvatar: "/avatars/alex.jpg",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "The idea for EcoDelivery came from my experience working in the logistics industry and seeing firsthand the environmental impact of traditional delivery methods. I spent six months researching the market, interviewing potential customers, and developing the initial business model.\n\nAfter validating the concept with a small pilot program in my local area, I assembled a team of developers and logistics experts to build the platform. We've been refining our algorithms and expanding our network of drivers over the past year.",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532941782857-9fde25d38d70?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Last-mile delivery is one of the most carbon-intensive aspects of e-commerce, contributing significantly to urban air pollution and greenhouse gas emissions. Traditional delivery services rely heavily on fossil fuel vehicles and inefficient routing, leading to unnecessary emissions and traffic congestion.",
    solution: "EcoDelivery addresses these challenges through a three-pronged approach: 1) A fleet of electric delivery vehicles, 2) AI-powered route optimization to minimize distance and energy consumption, and 3) A shared delivery model that consolidates packages going to the same area.",
    market: "The last-mile delivery market is projected to grow to $200 billion by 2027, with sustainable delivery options becoming increasingly important to both businesses and consumers. Our target market includes eco-conscious consumers, local businesses looking to reduce their carbon footprint, and e-commerce platforms seeking sustainable delivery partners.",
    businessModel: "EcoDelivery operates on a commission-based model, taking a percentage of each delivery fee. We also offer subscription plans for businesses with regular delivery needs, providing them with priority service and discounted rates. Our platform connects independent drivers using electric vehicles with delivery opportunities, creating a flexible and scalable network.",
    team: [
      {
        name: "Alex Johnson",
        role: "Founder & CEO",
        bio: "Former logistics executive with 10+ years of experience in the delivery industry.",
        avatar: "/avatars/alex.jpg",
      },
      {
        name: "Sarah Chen",
        role: "CTO",
        bio: "Software engineer specializing in route optimization algorithms and mobile app development.",
        avatar: "/avatars/sarah.jpg",
      },
      {
        name: "Marcus Williams",
        role: "COO",
        bio: "Operations expert with experience scaling delivery networks across multiple cities.",
        avatar: "/avatars/marcus.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "MindfulAI",
    description: "AI-powered mental health companion that provides personalized support and resources for managing stress and anxiety.",
    fullDescription: "MindfulAI is a revolutionary mental health platform that combines artificial intelligence with evidence-based therapeutic techniques to provide personalized mental wellness support. Our AI companion learns from user interactions to offer tailored coping strategies, mindfulness exercises, and emotional support when it's needed most.\n\nUnlike generic mental health apps, MindfulAI adapts to each user's unique needs and preferences, creating a truly personalized experience. The platform also connects users with licensed therapists when additional support is needed, bridging the gap between self-help tools and professional care.",
    category: "Health Tech",
    views: 982,
    likes: 76,
    createdAt: new Date(2023, 11, 2),
    author: "Samantha Lee",
    authorAvatar: "/avatars/samantha.jpg",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "The idea for MindfulAI emerged from my personal struggles with anxiety and the limitations I found in existing mental health apps. As a psychologist with a background in machine learning, I saw an opportunity to create something that could provide more personalized support.\n\nI spent a year researching and developing the initial AI algorithms, collaborating with mental health professionals to ensure the platform was grounded in evidence-based practices. After several rounds of testing and refinement, we launched a beta version that received overwhelmingly positive feedback from users.",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Mental health issues affect millions of people worldwide, but access to quality care remains limited due to cost, stigma, and availability of professionals. Existing digital solutions often provide generic content that doesn't address individual needs or adapt to changing circumstances.",
    solution: "MindfulAI addresses these challenges by providing: 1) An AI companion that learns from interactions to offer personalized support, 2) Evidence-based therapeutic techniques adapted to individual preferences, 3) Seamless connection to professional therapists when needed, and 4) Privacy-focused design that protects sensitive health information.",
    market: "The mental health app market is projected to reach $3.9 billion by 2027, with increasing demand for digital solutions that complement traditional therapy. Our target market includes individuals seeking accessible mental health support, employers looking to provide mental wellness benefits, and healthcare providers seeking digital tools to extend their care.",
    businessModel: "MindfulAI operates on a freemium subscription model, with basic features available for free and advanced personalization and therapist connections available through monthly or annual subscriptions. We also offer enterprise plans for employers and healthcare providers who want to provide the service to their employees or patients.",
    team: [
      {
        name: "Samantha Lee",
        role: "Founder & CEO",
        bio: "Clinical psychologist with expertise in cognitive behavioral therapy and machine learning.",
        avatar: "/avatars/samantha.jpg",
      },
      {
        name: "David Chen",
        role: "CTO",
        bio: "AI researcher specializing in natural language processing and emotional intelligence algorithms.",
        avatar: "/avatars/david.jpg",
      },
      {
        name: "Maya Patel",
        role: "Head of Clinical Research",
        bio: "Licensed therapist with experience developing digital mental health interventions.",
        avatar: "/avatars/maya.jpg",
      },
    ],
  },
  {
    id: "3",
    title: "UrbanFarm",
    description: "Vertical farming solution for urban environments, enabling local food production with minimal space and water usage.",
    fullDescription: "UrbanFarm is revolutionizing urban agriculture with a modular vertical farming system designed specifically for city environments. Our technology enables local food production in unused urban spaces, from rooftops to basements, using 95% less water and 99% less land than traditional farming methods.\n\nOur proprietary LED lighting and nutrient delivery systems are optimized for maximum yield and nutritional value, while our smart monitoring platform ensures optimal growing conditions with minimal human intervention. UrbanFarm units can grow a wide variety of leafy greens, herbs, and select vegetables year-round, regardless of external climate conditions.",
    category: "AgTech",
    views: 1567,
    likes: 124,
    createdAt: new Date(2023, 11, 20),
    author: "Michael Chen",
    authorAvatar: "/avatars/michael.jpg",
    coverImage: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "UrbanFarm began as a research project during my graduate studies in agricultural engineering. I was fascinated by the potential of vertical farming to address food security in urban areas, but frustrated by the high costs and complexity of existing systems.\n\nWorking with a team of engineers and plant scientists, we developed a more efficient and scalable approach to vertical farming. We built and tested multiple prototypes, refining our design based on real-world performance data. After securing initial funding, we established a pilot farm that now supplies fresh produce to several local restaurants and grocery stores.",
    images: [
      "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601704241337-c156d9810f7d?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Traditional agriculture faces numerous challenges including water scarcity, land degradation, and long supply chains that result in food waste and reduced nutritional value. Urban areas particularly struggle with food security and access to fresh produce, relying on imports that contribute to carbon emissions.",
    solution: "UrbanFarm addresses these challenges through: 1) Vertical farming technology that maximizes production in minimal space, 2) Closed-loop water systems that reduce water usage by 95%, 3) Optimized LED lighting that minimizes energy consumption while maximizing plant growth, and 4) Smart monitoring systems that ensure optimal growing conditions with minimal human intervention.",
    market: "The global vertical farming market is projected to reach $21.15 billion by 2028, driven by increasing urbanization, concerns about food security, and demand for locally grown produce. Our target market includes urban property developers, grocery retailers seeking local supply chains, restaurants focused on farm-to-table cuisine, and municipalities investing in food security.",
    businessModel: "UrbanFarm operates on a hybrid business model: 1) Direct sales of farming units to businesses and institutions, 2) Subscription-based software and support services for system monitoring and optimization, 3) Licensing of our proprietary technology to larger agricultural operations, and 4) Operation of our own urban farms in select high-demand locations.",
    team: [
      {
        name: "Michael Chen",
        role: "Founder & CEO",
        bio: "Agricultural engineer with expertise in sustainable farming systems and urban agriculture.",
        avatar: "/avatars/michael.jpg",
      },
      {
        name: "Sophia Rodriguez",
        role: "CTO",
        bio: "Systems engineer specializing in automation and IoT solutions for controlled environment agriculture.",
        avatar: "/avatars/sophia.jpg",
      },
      {
        name: "Dr. James Wilson",
        role: "Head of Plant Science",
        bio: "Plant physiologist with research focus on optimizing growth conditions in artificial environments.",
        avatar: "/avatars/james.jpg",
      },
    ],
  },
  {
    id: "4",
    title: "LearnLoop",
    description: "Adaptive learning platform that personalizes educational content based on individual learning styles and progress.",
    fullDescription: "LearnLoop is transforming education through personalized learning experiences that adapt to each student's unique needs, preferences, and pace. Our platform uses advanced algorithms to analyze learning patterns and create customized educational pathways that optimize engagement and knowledge retention.\n\nBy combining cognitive science with machine learning, LearnLoop identifies knowledge gaps, learning preferences, and optimal challenge levels to deliver the right content at the right time. Our comprehensive analytics provide educators with actionable insights while empowering students to take ownership of their learning journey.",
    category: "EdTech",
    views: 876,
    likes: 67,
    createdAt: new Date(2023, 11, 25),
    author: "Priya Patel",
    authorAvatar: "/avatars/priya.jpg",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "LearnLoop was born from my experience as an educator witnessing how traditional one-size-fits-all approaches failed many students. I believed technology could help create truly personalized learning experiences at scale.\n\nI partnered with learning scientists and software developers to build a prototype that we tested in several schools. The feedback from both students and teachers was invaluable in refining our algorithms and user experience. After two years of development and testing, we launched our platform commercially and have been continuously improving it based on user data and educational research.",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Traditional education follows a standardized approach that doesn't account for individual learning differences, resulting in disengagement, knowledge gaps, and limited achievement for many students. Educators struggle to provide personalized attention in large classrooms, while existing edtech solutions often digitize conventional methods without truly adapting to individual needs.",
    solution: "LearnLoop solves these challenges through: 1) Adaptive learning algorithms that create personalized learning pathways, 2) Multi-modal content delivery that matches individual learning preferences, 3) Real-time assessment that identifies and addresses knowledge gaps, and 4) Comprehensive analytics that provide actionable insights for educators and students.",
    market: "The global adaptive learning market is projected to reach $9.11 billion by 2028, driven by increasing demand for personalized education and remote learning solutions. Our target market includes K-12 schools, higher education institutions, corporate training programs, and individual learners seeking personalized educational experiences.",
    businessModel: "LearnLoop operates on a subscription model with tiered pricing for different user types: 1) Individual learner subscriptions, 2) Classroom and school licenses for educational institutions, 3) Enterprise plans for corporate training programs, and 4) Content partnerships with educational publishers who want to integrate adaptive capabilities into their materials.",
    team: [
      {
        name: "Priya Patel",
        role: "Founder & CEO",
        bio: "Former educator with expertise in learning science and educational technology.",
        avatar: "/avatars/priya.jpg",
      },
      {
        name: "Jason Kim",
        role: "CTO",
        bio: "Machine learning specialist with background in developing adaptive systems.",
        avatar: "/avatars/jason.jpg",
      },
      {
        name: "Dr. Lisa Thompson",
        role: "Chief Learning Officer",
        bio: "Educational psychologist with research focus on personalized learning and assessment.",
        avatar: "/avatars/lisa.jpg",
      },
    ],
  },
  {
    id: "5",
    title: "SecureShare",
    description: "Blockchain-based platform for secure document sharing and verification with tamper-proof audit trails.",
    fullDescription: "SecureShare is revolutionizing document security and verification through blockchain technology. Our platform enables businesses and individuals to share sensitive documents with complete confidence that they cannot be altered, forged, or accessed by unauthorized parties.\n\nEvery document uploaded to SecureShare is encrypted, hashed, and recorded on a distributed ledger, creating an immutable audit trail of all access and modifications. Our patent-pending verification system allows recipients to instantly confirm the authenticity of any document, while granular permission controls ensure that sensitive information remains protected.",
    category: "Cybersecurity",
    views: 1102,
    likes: 93,
    createdAt: new Date(2023, 11, 28),
    author: "David Rodriguez",
    authorAvatar: "/avatars/david.jpg",
    coverImage: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "The idea for SecureShare came after I witnessed several cases of document fraud and data breaches in my previous role as a compliance officer. I recognized that existing solutions focused on access control but failed to address document integrity and verification.\n\nI assembled a team of blockchain developers and security experts to create a prototype that combined strong encryption with distributed ledger technology. We spent 18 months developing and testing the platform, working closely with legal and financial institutions to ensure it met their stringent security and compliance requirements.",
    images: [
      "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Document fraud, unauthorized access, and data breaches pose significant risks to businesses and individuals, resulting in financial losses, legal liabilities, and reputational damage. Traditional document security solutions focus primarily on access control but fail to address document integrity, verification, and comprehensive audit trails.",
    solution: "SecureShare addresses these challenges through: 1) Blockchain-based document verification that prevents tampering and forgery, 2) End-to-end encryption that protects document contents during storage and transmission, 3) Granular permission controls that prevent unauthorized access, and 4) Immutable audit trails that record all document activities.",
    market: "The global document security market is projected to reach $5.9 billion by 2026, driven by increasing concerns about data breaches and regulatory compliance. Our target market includes legal firms, financial institutions, healthcare organizations, government agencies, and any business that handles sensitive documents requiring verification and security.",
    businessModel: "SecureShare operates on a tiered subscription model based on storage volume and user numbers, with additional transaction fees for document verification services. We also offer enterprise plans with custom integration options and white-label solutions for organizations that want to incorporate our technology into their existing systems.",
    team: [
      {
        name: "David Rodriguez",
        role: "Founder & CEO",
        bio: "Former compliance officer with expertise in document security and regulatory requirements.",
        avatar: "/avatars/david.jpg",
      },
      {
        name: "Aisha Johnson",
        role: "CTO",
        bio: "Blockchain developer with background in cryptography and distributed systems.",
        avatar: "/avatars/aisha.jpg",
      },
      {
        name: "Thomas Chen",
        role: "Head of Security",
        bio: "Cybersecurity expert with experience in developing secure document management systems.",
        avatar: "/avatars/thomas.jpg",
      },
    ],
  },
  {
    id: "6",
    title: "VirtualFit",
    description: "AR-powered virtual fitting room that allows shoppers to try on clothes digitally before purchasing.",
    fullDescription: "VirtualFit is transforming online shopping with augmented reality technology that creates a virtual fitting room experience. Our platform allows shoppers to see how clothing items will look and fit on their actual body without physically trying them on, dramatically improving purchase confidence and reducing returns.\n\nUsing advanced computer vision and 3D modeling, VirtualFit creates a personalized avatar based on the shopper's measurements and body type. Shoppers can then virtually try on different sizes, styles, and combinations, viewing themselves from multiple angles and in different lighting conditions to make informed purchase decisions.",
    category: "Retail Tech",
    views: 1320,
    likes: 108,
    createdAt: new Date(2023, 12, 5),
    author: "Emma Wilson",
    authorAvatar: "/avatars/emma.jpg",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "VirtualFit was inspired by my frustration with online clothes shopping and the endless cycle of ordering multiple sizes and returning items that didn't fit. As a fashion technology researcher, I knew there had to be a better way.\n\nI partnered with AR developers and fashion industry experts to create a solution that would accurately represent how clothing fits on different body types. We developed proprietary algorithms for fabric physics simulation and body measurement extraction from simple photos. After extensive testing with fashion retailers and consumers, we refined our technology to achieve remarkable accuracy in predicting fit and appearance.",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Online clothing retailers face return rates of 30-40%, primarily due to fit issues, resulting in significant costs and environmental impact. Consumers lack confidence when shopping online without the ability to try items on, leading to abandoned carts, multiple orders of the same item in different sizes, and frustration with the return process.",
    solution: "VirtualFit addresses these challenges through: 1) AR-powered virtual try-on technology that shows how clothes will actually fit, 2) Personalized avatars based on individual body measurements, 3) Realistic fabric simulation that accounts for different materials and draping characteristics, and 4) Size recommendation algorithms that suggest the best fit based on brand-specific sizing.",
    market: "The virtual fitting room market is projected to reach $10 billion by 2027, driven by the growth of e-commerce and demand for improved online shopping experiences. Our target market includes online clothing retailers, fashion brands, and e-commerce platforms seeking to reduce returns and increase customer satisfaction.",
    businessModel: "VirtualFit operates on a SaaS model with tiered pricing based on integration level and transaction volume. We offer: 1) API integration for e-commerce platforms, 2) White-label solutions for major retailers, 3) Revenue sharing based on reduction in return rates, and 4) Premium consumer subscriptions for shoppers who want to use the technology across multiple retail sites.",
    team: [
      {
        name: "Emma Wilson",
        role: "Founder & CEO",
        bio: "Fashion technology researcher with expertise in digital fashion and e-commerce.",
        avatar: "/avatars/emma.jpg",
      },
      {
        name: "Raj Patel",
        role: "CTO",
        bio: "AR/VR developer specializing in computer vision and 3D modeling.",
        avatar: "/avatars/raj.jpg",
      },
      {
        name: "Olivia Chen",
        role: "Chief Fashion Officer",
        bio: "Former fashion buyer with experience in apparel design and retail operations.",
        avatar: "/avatars/olivia.jpg",
      },
    ],
  },
  {
    id: "7",
    title: "GreenEnergy",
    description: "Renewable energy solution that combines solar and wind power with advanced battery storage for residential buildings.",
    fullDescription: "GreenEnergy is revolutionizing residential power with an integrated renewable energy system that combines solar panels, micro wind turbines, and advanced battery storage. Our solution enables homeowners to generate, store, and manage their own clean energy, reducing reliance on the grid and lowering carbon emissions.\n\nOur proprietary energy management system optimizes power generation and usage based on weather forecasts, household consumption patterns, and grid conditions. The modular design allows for customization based on each home's specific needs and location, ensuring maximum efficiency and return on investment.",
    category: "Sustainability",
    views: 1450,
    likes: 132,
    createdAt: new Date(2023, 9, 10),
    author: "James Miller",
    authorAvatar: "/avatars/james.jpg",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "GreenEnergy began when I was renovating my own home and found existing renewable energy solutions to be either inefficient, prohibitively expensive, or aesthetically unappealing. With my background in electrical engineering and renewable energy, I set out to create something better.\n\nI assembled a team of experts in solar technology, wind energy, and battery systems to develop a truly integrated solution. We spent two years testing different configurations and materials, focusing on maximizing efficiency while minimizing cost and visual impact. After installing prototype systems in several homes and gathering performance data, we refined our design to what it is today.",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548407260-da850faa41e3?q=80&w=2069&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Residential buildings account for approximately 20% of global energy consumption and carbon emissions. Traditional renewable energy solutions for homes often suffer from intermittent generation, limited storage capacity, poor aesthetics, and complex installation, making them impractical or unappealing for many homeowners.",
    solution: "GreenEnergy addresses these challenges through: 1) An integrated system that combines multiple renewable sources for consistent generation, 2) Advanced battery technology that provides reliable storage and backup power, 3) Smart energy management software that optimizes generation and consumption, and 4) Modular, aesthetically pleasing designs that integrate seamlessly with existing architecture.",
    market: "The residential renewable energy market is projected to reach $165 billion by 2028, driven by increasing environmental awareness, rising energy costs, and government incentives. Our target market includes environmentally conscious homeowners, new home builders, residential developers, and communities seeking microgrid solutions.",
    businessModel: "GreenEnergy operates on a direct sales model with multiple revenue streams: 1) System sales and installation services, 2) Subscription-based monitoring and optimization software, 3) Maintenance and upgrade services, and 4) Energy trading platform that allows customers to sell excess power to neighbors or back to the grid.",
    team: [
      {
        name: "James Miller",
        role: "Founder & CEO",
        bio: "Electrical engineer with expertise in renewable energy systems and smart grid technology.",
        avatar: "/avatars/james.jpg",
      },
      {
        name: "Dr. Elena Rodriguez",
        role: "CTO",
        bio: "Renewable energy researcher specializing in energy storage and system integration.",
        avatar: "/avatars/elena.jpg",
      },
      {
        name: "Michael Chen",
        role: "Head of Product Design",
        bio: "Industrial designer with focus on sustainable and aesthetically pleasing energy solutions.",
        avatar: "/avatars/michael.jpg",
      },
    ],
  },
  {
    id: "8",
    title: "FoodConnect",
    description: "Platform connecting local farmers directly with consumers, reducing food waste and supporting sustainable agriculture.",
    fullDescription: "FoodConnect is bridging the gap between local farmers and consumers through a digital marketplace that enables direct farm-to-table transactions. Our platform helps reduce food waste, support sustainable farming practices, and provide consumers with fresher, healthier food options.\n\nFarmers can list their available produce, set their own prices, and manage deliveries through our intuitive interface. Consumers can browse local offerings, place orders for pickup or delivery, and learn about the farms and farming practices behind their food. By eliminating middlemen and shortening supply chains, FoodConnect creates a more sustainable and equitable food system.",
    category: "AgTech",
    views: 987,
    likes: 79,
    createdAt: new Date(2023, 10, 5),
    author: "Sophia Garcia",
    authorAvatar: "/avatars/sophia.jpg",
    coverImage: "https://images.unsplash.com/photo-1505471768190-275e2ad070d9?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "FoodConnect was born from my experiences growing up in a farming community and witnessing the challenges small farmers face in getting fair prices for their produce while seeing consumers pay premium prices for lower quality imported foods.\n\nI started by conducting extensive interviews with both farmers and consumers to understand their needs and pain points. With this research, I developed a prototype platform and tested it with a small group of farms and customers in my local area. The feedback was overwhelmingly positive, and we've been expanding our network of farmers and consumers ever since.",
    images: [
      "https://images.unsplash.com/photo-1505471768190-275e2ad070d9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470072768013-bf9532016c10?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595351298020-7f1db2569fd2?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "The current food system is characterized by long supply chains with multiple intermediaries, resulting in farmers receiving only a small fraction of the final food price, while consumers pay more for less fresh produce. This system also contributes to significant food waste, environmental degradation, and disconnection between people and the sources of their food.",
    solution: "FoodConnect addresses these challenges through: 1) A digital marketplace that enables direct farmer-to-consumer transactions, 2) Logistics coordination for efficient local delivery, 3) Transparency features that educate consumers about farming practices and food sources, and 4) Community-building tools that strengthen local food systems.",
    market: "The direct-to-consumer food market is projected to reach $93 billion by 2025, driven by increasing demand for local, sustainable, and traceable food. Our target market includes environmentally conscious consumers, local farmers and producers, food co-ops, and institutions seeking to source locally.",
    businessModel: "FoodConnect operates on a marketplace model with multiple revenue streams: 1) Commission on transactions through the platform, 2) Premium subscriptions for farmers with enhanced features and analytics, 3) Subscription boxes for consumers featuring seasonal local produce, and 4) Value-added services such as marketing support for farmers and meal planning tools for consumers.",
    team: [
      {
        name: "Sophia Garcia",
        role: "Founder & CEO",
        bio: "Agricultural economist with experience in sustainable food systems and rural development.",
        avatar: "/avatars/sophia.jpg",
      },
      {
        name: "Thomas Lee",
        role: "CTO",
        bio: "Software developer specializing in marketplace platforms and logistics optimization.",
        avatar: "/avatars/thomas.jpg",
      },
      {
        name: "Maria Rodriguez",
        role: "Head of Farmer Relations",
        bio: "Former organic farmer with extensive network in sustainable agriculture communities.",
        avatar: "/avatars/maria.jpg",
      },
    ],
  },
  {
    id: "9",
    title: "CyberGuard",
    description: "AI-powered cybersecurity solution that detects and prevents threats in real-time for small businesses.",
    fullDescription: "CyberGuard is democratizing enterprise-grade cybersecurity for small and medium-sized businesses through an AI-powered platform that detects, prevents, and responds to cyber threats in real-time. Our solution provides comprehensive protection without requiring specialized IT staff or extensive security knowledge.\n\nUsing advanced machine learning algorithms, CyberGuard continuously monitors network traffic, user behavior, and system activities to identify potential threats before they cause damage. The platform automatically implements protective measures and provides clear, actionable alerts when human intervention is needed, making robust cybersecurity accessible to businesses of all sizes.",
    category: "Cybersecurity",
    views: 1205,
    likes: 97,
    createdAt: new Date(2023, 8, 15),
    author: "Ryan Kim",
    authorAvatar: "/avatars/ryan.jpg",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    creationProcess: "CyberGuard emerged from my experience as a cybersecurity consultant for large enterprises, where I saw that small businesses faced the same threats but lacked the resources to implement adequate protection. I believed that AI could bridge this gap by automating much of the expertise that typically requires a dedicated security team.\n\nI partnered with data scientists and security experts to develop algorithms that could identify patterns indicative of cyber attacks. We trained our models on vast datasets of both normal and malicious activities, refining them through extensive testing in real-world environments. After successfully protecting our beta customers from several actual attack attempts, we knew we had created something valuable.",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Small and medium-sized businesses face the same cybersecurity threats as large enterprises but lack the resources, expertise, and budget to implement adequate protection. Traditional security solutions are either too complex, requiring specialized staff to manage, or too basic to provide effective protection against sophisticated modern threats.",
    solution: "CyberGuard addresses these challenges through: 1) AI-powered threat detection that identifies both known and novel attack patterns, 2) Automated response capabilities that contain threats without human intervention, 3) User-friendly interface designed for non-technical staff, and 4) Continuous learning system that adapts to evolving threats and business environments.",
    market: "The SMB cybersecurity market is projected to reach $68 billion by 2026, driven by increasing awareness of cyber risks and regulatory requirements. Our target market includes small and medium-sized businesses across all industries, managed service providers seeking security solutions for their clients, and industry-specific verticals with unique compliance requirements.",
    businessModel: "CyberGuard operates on a SaaS subscription model with tiered pricing based on company size and required features. We offer: 1) Basic protection for very small businesses, 2) Advanced features for growing companies with more complex needs, 3) Industry-specific compliance packages, and 4) Partner programs for IT service providers who want to offer our solution to their clients.",
    team: [
      {
        name: "Ryan Kim",
        role: "Founder & CEO",
        bio: "Cybersecurity expert with experience protecting organizations from advanced persistent threats.",
        avatar: "/avatars/ryan.jpg",
      },
      {
        name: "Dr. Aisha Johnson",
        role: "Chief AI Officer",
        bio: "Machine learning specialist with focus on anomaly detection and behavioral analysis.",
        avatar: "/avatars/aisha.jpg",
      },
      {
        name: "Mark Thompson",
        role: "Head of Security Operations",
        bio: "Former security operations center director with expertise in threat response and mitigation.",
        avatar: "/avatars/mark.jpg",
      },
    ],
  },
  {
    id: "10",
    title: "MedConnect",
    description: "Telemedicine platform that connects patients with specialists worldwide for second opinions and consultations.",
    fullDescription: "MedConnect is transforming healthcare access by connecting patients with medical specialists around the world for virtual consultations and second opinions. Our platform breaks down geographical barriers to specialized care, enabling patients to receive expert medical advice regardless of their location.\n\nUsing secure video conferencing, digital health record sharing, and AI-powered matching algorithms, MedConnect facilitates meaningful connections between patients and the right specialists for their specific conditions. The platform also provides translation services, appointment scheduling, and secure payment processing to create a seamless experience for both patients and healthcare providers.",
    category: "Health Tech",
    views: 1560,
    likes: 145,
    createdAt: new Date(2023, 7, 20),
    author: "Olivia Thompson",
    authorAvatar: "/avatars/olivia.jpg",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "MedConnect was born from my personal experience seeking specialized medical care for a rare condition. Despite living in a major city, I struggled to find local specialists and faced long waiting times. I realized that many patients around the world face even greater barriers to accessing specialized care.\n\nWith my background in healthcare administration and technology, I assembled a team of medical professionals and software developers to create a platform that would connect patients with specialists regardless of location. We conducted extensive research on regulatory requirements across different countries and developed secure systems for sharing medical information and facilitating virtual consultations.",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Millions of patients worldwide lack access to specialized medical expertise due to geographical limitations, long waiting times, and healthcare system constraints. This leads to delayed diagnoses, suboptimal treatment plans, and unnecessary suffering, particularly for patients with rare or complex conditions who need specialized knowledge not available locally.",
    solution: "MedConnect addresses these challenges through: 1) A global network of verified medical specialists across diverse fields, 2) Secure virtual consultation technology that works even in low-bandwidth environments, 3) AI-powered matching algorithms that connect patients with the most appropriate specialists, and 4) Comprehensive support services including medical record management, translation, and follow-up coordination.",
    market: "The global telemedicine market is projected to reach $298 billion by 2028, with second opinion services growing at a CAGR of 24%. Our target market includes patients with complex or rare conditions seeking specialized care, individuals looking for second opinions on diagnoses or treatment plans, healthcare providers seeking specialist consultations, and insurance companies looking to improve outcomes while reducing costs.",
    businessModel: "MedConnect operates on a multi-sided marketplace model with several revenue streams: 1) Consultation fees with revenue sharing between specialists and the platform, 2) Subscription plans for healthcare providers who want to offer specialist consultations to their patients, 3) Premium patient memberships with additional services and discounted rates, and 4) Enterprise solutions for insurance companies and large employers.",
    team: [
      {
        name: "Olivia Thompson",
        role: "Founder & CEO",
        bio: "Healthcare administrator with expertise in international medical systems and patient advocacy.",
        avatar: "/avatars/olivia.jpg",
      },
      {
        name: "Dr. Robert Chen",
        role: "Chief Medical Officer",
        bio: "Physician with experience in telemedicine implementation and clinical quality assurance.",
        avatar: "/avatars/robert.jpg",
      },
      {
        name: "Sophia Martinez",
        role: "CTO",
        bio: "Software engineer specializing in secure healthcare applications and HIPAA-compliant systems.",
        avatar: "/avatars/sophia.jpg",
      },
    ],
  },
  {
    id: "11",
    title: "SkillBridge",
    description: "Peer-to-peer skill sharing platform that connects learners with experts for personalized mentorship.",
    fullDescription: "SkillBridge is revolutionizing skill development through a peer-to-peer platform that connects learners with experts for personalized mentorship and knowledge transfer. Our marketplace enables anyone to share their expertise or learn new skills through one-on-one guidance, small group sessions, and project-based learning.\n\nUnlike traditional educational platforms that offer pre-recorded content, SkillBridge facilitates direct connections between individuals, creating personalized learning experiences tailored to each learner's specific goals, pace, and learning style. From professional skills like programming and design to creative pursuits like music and cooking, SkillBridge makes expertise accessible to everyone.",
    category: "EdTech",
    views: 890,
    likes: 72,
    createdAt: new Date(2023, 6, 10),
    author: "Daniel Park",
    authorAvatar: "/avatars/daniel.jpg",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    creationProcess: "SkillBridge emerged from my experience as both a learner and a teacher. I found that the most valuable learning experiences came from direct mentorship rather than passive consumption of content, yet finding the right mentor was often challenging and expensive.\n\nI started by building a simple platform to connect people in my local community who wanted to teach or learn specific skills. The response was overwhelming, with people discovering that sharing their knowledge was as rewarding as acquiring new skills. Based on this success, we expanded the platform to include virtual connections, skill verification, and project-based learning frameworks.",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Traditional education and online learning platforms often fail to provide the personalized guidance and feedback necessary for effective skill development. Many learners struggle with generic content that doesn't address their specific goals, learning styles, or knowledge gaps, while experts lack accessible platforms to share their knowledge and get fairly compensated.",
    solution: "SkillBridge addresses these challenges through: 1) A marketplace that directly connects learners with relevant experts, 2) Flexible learning formats including one-on-one mentorship, small group sessions, and project-based learning, 3) Skill verification and reputation systems that ensure quality, and 4) Tools for scheduling, virtual collaboration, and progress tracking.",
    market: "The global online learning market is projected to reach $350 billion by 2025, with personalized learning and mentorship segments growing rapidly. Our target market includes professionals seeking to upskill or change careers, students looking for supplementary guidance, hobbyists pursuing creative skills, and experts who want to monetize their knowledge and experience.",
    businessModel: "SkillBridge operates on a marketplace model with multiple revenue streams: 1) Commission on session fees paid to experts, 2) Premium subscriptions for learners with additional features and discounted rates, 3) Enterprise plans for organizations that want to facilitate internal skill sharing and mentorship, and 4) Certification programs for in-demand skills with verified assessments.",
    team: [
      {
        name: "Daniel Park",
        role: "Founder & CEO",
        bio: "Education technology entrepreneur with background in peer learning and community building.",
        avatar: "/avatars/daniel.jpg",
      },
      {
        name: "Priya Sharma",
        role: "Chief Learning Officer",
        bio: "Educational psychologist specializing in adult learning and skill acquisition methodologies.",
        avatar: "/avatars/priya.jpg",
      },
      {
        name: "Jason Lee",
        role: "CTO",
        bio: "Full-stack developer with expertise in marketplace platforms and real-time collaboration tools.",
        avatar: "/avatars/jason.jpg",
      },
    ],
  },
  {
    id: "12",
    title: "ShopSmart",
    description: "AI shopping assistant that helps consumers find the best deals and most sustainable products across online retailers.",
    fullDescription: "ShopSmart is transforming online shopping with an AI-powered assistant that helps consumers make smarter purchasing decisions. Our platform analyzes millions of products across thousands of retailers to find the best deals, compare features, verify sustainability claims, and provide personalized recommendations based on individual preferences and values.\n\nUnlike traditional price comparison tools, ShopSmart considers multiple factors beyond price, including product quality, environmental impact, ethical manufacturing, shipping emissions, and return policies. Our browser extension and mobile app seamlessly integrate with the shopping experience, providing real-time insights and alternatives as consumers browse online stores.",
    category: "Retail Tech",
    views: 1100,
    likes: 88,
    createdAt: new Date(2023, 5, 15),
    author: "Mia Johnson",
    authorAvatar: "/avatars/mia.jpg",
    coverImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    creationProcess: "ShopSmart was inspired by my frustration with the overwhelming number of options and misleading claims in online shopping. I wanted to create a tool that would cut through the noise and help people make choices aligned with both their budget and values.\n\nI started by building a simple price comparison tool, but quickly realized that consumers needed much more comprehensive information to make truly informed decisions. Working with data scientists and sustainability experts, we developed algorithms to analyze and verify product information from multiple sources. We also conducted extensive user research to understand how people make purchasing decisions and what information they find most valuable.",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    problem: "Online shoppers face information overload and struggle to evaluate products across multiple dimensions including price, quality, sustainability, and ethical manufacturing. Misleading marketing claims and greenwashing make it difficult for consumers to make purchasing decisions aligned with their values, while the fragmentation of online retail requires checking multiple sites to find the best options.",
    solution: "ShopSmart addresses these challenges through: 1) AI-powered product analysis that evaluates items across multiple dimensions, 2) Real-time price and availability tracking across thousands of retailers, 3) Verification of sustainability and ethical claims using third-party certifications and supply chain data, and 4) Personalized recommendations based on individual preferences and shopping history.",
    market: "The global e-commerce market exceeds $5 trillion annually, with conscious consumers representing a rapidly growing segment. Our target market includes environmentally and socially conscious shoppers, budget-conscious consumers seeking the best deals, and busy professionals who value efficiency in their shopping experience.",
    businessModel: "ShopSmart operates on a multi-sided business model with several revenue streams: 1) Affiliate commissions from retailers when users make purchases through our platform, 2) Premium subscriptions offering advanced features and personalized shopping assistance, 3) Licensing our product data and sustainability metrics to retailers and brands, and 4) Targeted advertising from brands that meet our sustainability and ethical standards.",
    team: [
      {
        name: "Mia Johnson",
        role: "Founder & CEO",
        bio: "Consumer technology expert with background in e-commerce and sustainable business practices.",
        avatar: "/avatars/mia.jpg",
      },
      {
        name: "Raj Patel",
        role: "CTO",
        bio: "AI researcher specializing in natural language processing and product data analysis.",
        avatar: "/avatars/raj.jpg",
      },
      {
        name: "Emma Garcia",
        role: "Head of Sustainability",
        bio: "Environmental scientist with expertise in product lifecycle assessment and sustainability metrics.",
        avatar: "/avatars/emma.jpg",
      },
    ],
  }
];

function PitchDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [pitch, setPitch] = useState<(typeof DETAILED_PITCHES)[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);

    // Find the pitch with the matching ID
    const foundPitch = DETAILED_PITCHES.find(p => p.id === params.id);

    if (foundPitch) {
      setPitch(foundPitch);
      setIsLoading(false);
    } else {
      // If no pitch is found, redirect to the pitches page
      router.push("/pitches");
    }
  }, [params.id, router]);

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Handle image navigation
  const nextImage = () => {
    if (pitch) {
      setActiveImageIndex((prev) => (prev + 1) % pitch.images.length);
    }
  };

  const prevImage = () => {
    if (pitch) {
      setActiveImageIndex((prev) => (prev - 1 + pitch.images.length) % pitch.images.length);
    }
  };

  if (isLoading) {
    return (
      <AnimatedGradientBackground
        colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"]}
        className="absolute inset-0"
        containerClassName="min-h-screen"
        blur={150}
        speed={30}
        opacity={0.05}
      >
        <div className="min-h-screen">
          <DashboardNavbar />
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-48 bg-white/30 dark:bg-black/30 rounded-lg"></div>
              <div className="h-64 w-full bg-white/30 dark:bg-black/30 rounded-xl"></div>
              <div className="h-8 w-64 bg-white/30 dark:bg-black/30 rounded-lg"></div>
              <div className="h-32 w-full bg-white/30 dark:bg-black/30 rounded-xl"></div>
            </div>
          </div>
        </div>
      </AnimatedGradientBackground>
    );
  }

  if (!pitch) {
    return (
      <AnimatedGradientBackground
        colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"]}
        className="absolute inset-0"
        containerClassName="min-h-screen"
        blur={150}
        speed={30}
        opacity={0.05}
      >
        <div className="min-h-screen">
          <DashboardNavbar />
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Pitch Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The pitch you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Button onClick={() => router.push("/pitches")}>
              Back to Pitches
            </Button>
          </div>
        </div>
      </AnimatedGradientBackground>
    );
  }

  return (
    <AnimatedGradientBackground
      colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"]}
      className="absolute inset-0"
      containerClassName="min-h-screen"
      blur={150}
      speed={30}
      opacity={0.05}
    >
      <div className="min-h-screen">
        <DashboardNavbar />

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <IconArrowLeft size={16} />
              Back to Pitches
            </Button>
          </div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10" />
              <Image
                src={pitch.coverImage}
                alt={pitch.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                    {pitch.category}
                  </span>
                  <div className="flex items-center text-white/80">
                    <IconEye size={16} className="mr-1" />
                    <span className="text-sm">{pitch.views} views</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <IconHeart size={16} className="mr-1" />
                    <span className="text-sm">{pitch.likes} likes</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{pitch.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white overflow-hidden mr-3">
                      {pitch.authorAvatar ? (
                        <Image
                          src={pitch.authorAvatar}
                          alt={pitch.author}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        pitch.author.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{pitch.author}</p>
                      <p className="text-white/70 text-sm">
                        <IconCalendar size={14} className="inline mr-1" />
                        {formatDate(pitch.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button className="flex items-center gap-2">
              <IconHeart size={18} />
              Like
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <IconShare size={18} />
              Share
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <IconBookmark size={18} />
              Save
            </Button>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-wrap gap-8">
              {[
                { id: "overview", label: "Overview", icon: <IconBulb size={18} /> },
                { id: "creation", label: "Creation Process", icon: <IconTarget size={18} /> },
                { id: "gallery", label: "Gallery", icon: <IconPhoto size={18} /> },
                { id: "video", label: "Video Pitch", icon: <IconVideo size={18} /> },
                { id: "team", label: "Team", icon: <IconUsers size={18} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors ${
                    activeSection === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeSection === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Main description */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-4">About This Startup</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {pitch.fullDescription.split('\n\n').map((paragraph: string, idx: number) => (
                        <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-4">Problem</h2>
                    <p className="text-gray-700 dark:text-gray-300">{pitch.problem}</p>
                  </Card>

                  <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-4">Solution</h2>
                    <p className="text-gray-700 dark:text-gray-300">{pitch.solution}</p>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    <h2 className="text-xl font-bold mb-4">Market Opportunity</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{pitch.market}</p>
                  </Card>

                  <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    <h2 className="text-xl font-bold mb-4">Business Model</h2>
                    <p className="text-gray-700 dark:text-gray-300">{pitch.businessModel}</p>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeSection === "creation" && (
              <motion.div
                key="creation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6">The Creation Process</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {pitch.creationProcess.split('\n\n').map((paragraph: string, idx: number) => (
                      <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeSection === "gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6">Image Gallery</h2>

                  {/* Main image carousel */}
                  <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={pitch.images[activeImageIndex]}
                          alt={`${pitch.title} - Image ${activeImageIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
                    >
                      <IconArrowLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
                    >
                      <IconArrowRight size={20} />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm z-10">
                      {activeImageIndex + 1} / {pitch.images.length}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {pitch.images.map((image: PitchImage, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                          activeImageIndex === idx ? "ring-2 ring-blue-500" : ""
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${(idx as number) + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeSection === "video" && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6">Video Pitch</h2>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                    <iframe
                      src={pitch.videoUrl}
                      title={`${pitch.title} Video Pitch`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeSection === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pitch.team.map((member: TeamMember, idx: number) => (
                      <Card3d
                        key={idx}
                        className="h-full"
                        rotationIntensity={5}
                        glareOpacity={0.1}
                        glareSize={0.4}
                        shadow={true}
                        cardClassName="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 h-full p-6"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white overflow-hidden mb-4">
                            {member.avatar ? (
                              <Image
                                src={member.avatar}
                                alt={String(member.name)}
                                width={96}
                                height={96}
                                className="object-cover"
                              />
                            ) : (
                              String(member.name).charAt(0)
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                          <p className="text-blue-600 dark:text-blue-400 mb-4">{member.role}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                        </div>
                      </Card3d>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Related Pitches Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Related Pitches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DETAILED_PITCHES
                .filter(p => p.id !== pitch.id && p.category === pitch.category)
                .slice(0, 1)
                .map((relatedPitch, index) => (
                  <Card3d
                    key={index}
                    className="h-full"
                    rotationIntensity={5}
                    glareOpacity={0.1}
                    glareSize={0.4}
                    shadow={true}
                    cardClassName="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 h-full"
                  >
                    <Link href={`/pitches/${relatedPitch.id}`} className="block h-full">
                      <div className="flex flex-col h-full">
                        {/* Cover Image */}
                        {relatedPitch.coverImage && (
                          <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                            <Image
                              src={relatedPitch.coverImage}
                              alt={relatedPitch.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-2 line-clamp-1">{relatedPitch.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {relatedPitch.description}
                          </p>

                          {/* Author */}
                          <div className="flex items-center mt-auto">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white overflow-hidden">
                              {relatedPitch.authorAvatar ? (
                                <Image
                                  src={relatedPitch.authorAvatar}
                                  alt={relatedPitch.author}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              ) : (
                                relatedPitch.author.charAt(0)
                              )}
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium">{relatedPitch.author}</p>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <IconEye size={16} className="mr-1" />
                                <span className="text-xs">{relatedPitch.views}</span>
                              </div>
                              <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <IconHeart size={16} className="mr-1" />
                                <span className="text-xs">{relatedPitch.likes}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <IconCalendar size={16} className="mr-1" />
                              <span className="text-xs">{formatDate(relatedPitch.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card3d>
                ))}

              {/* Other popular pitches */}
              {DETAILED_PITCHES
                .filter(p => p.id !== pitch.id && p.category !== pitch.category)
                .sort((a, b) => b.views - a.views)
                .slice(0, 2)
                .map((popularPitch, index) => (
                  <Card3d
                    key={index}
                    className="h-full"
                    rotationIntensity={5}
                    glareOpacity={0.1}
                    glareSize={0.4}
                    shadow={true}
                    cardClassName="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 h-full"
                  >
                    <Link href={`/pitches/${popularPitch.id}`} className="block h-full">
                      <div className="flex flex-col h-full">
                        {/* Cover Image */}
                        {popularPitch.coverImage && (
                          <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                            <Image
                              src={popularPitch.coverImage}
                              alt={popularPitch.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="mb-2">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                              {popularPitch.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 line-clamp-1">{popularPitch.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {popularPitch.description}
                          </p>

                          {/* Author */}
                          <div className="flex items-center mt-auto">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white overflow-hidden">
                              {popularPitch.authorAvatar ? (
                                <Image
                                  src={popularPitch.authorAvatar}
                                  alt={popularPitch.author}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              ) : (
                                popularPitch.author.charAt(0)
                              )}
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium">{popularPitch.author}</p>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <IconEye size={16} className="mr-1" />
                                <span className="text-xs">{popularPitch.views}</span>
                              </div>
                              <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <IconHeart size={16} className="mr-1" />
                                <span className="text-xs">{popularPitch.likes}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <IconCalendar size={16} className="mr-1" />
                              <span className="text-xs">{formatDate(popularPitch.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card3d>
                ))}
            </div>
          </motion.div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}

// Main component that wraps the content in a Suspense boundary
export default function PitchDetailPage() {
  return (
    <Suspense fallback={
      <AnimatedGradientBackground
        colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"]}
        className="absolute inset-0"
        containerClassName="min-h-screen"
        blur={150}
        speed={30}
        opacity={0.05}
      >
        <div className="min-h-screen">
          <DashboardNavbar />
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-48 bg-white/30 dark:bg-black/30 rounded-lg"></div>
              <div className="h-64 w-full bg-white/30 dark:bg-black/30 rounded-xl"></div>
              <div className="h-8 w-64 bg-white/30 dark:bg-black/30 rounded-lg"></div>
              <div className="h-32 w-full bg-white/30 dark:bg-black/30 rounded-xl"></div>
            </div>
          </div>
        </div>
      </AnimatedGradientBackground>
    }>
      <PitchDetailContent />
    </Suspense>
  );
}

