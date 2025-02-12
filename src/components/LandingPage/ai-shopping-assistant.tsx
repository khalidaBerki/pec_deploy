//"use client"
//
//import { useState, useEffect, useRef } from "react"
//import { motion, AnimatePresence } from "framer-motion"
//import { X, Brain, Camera, Upload, Plus, Minus, ShoppingCart } from "lucide-react"
//import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"
//import Image from "next/image"
//
//interface Ingredient {
//  name: string
//  quantity?: number
//  unit?: string
//}
//
//interface Recipe {
//  title: string
//  duration: number
//}
//
//export function AIShoppingAssistant({ isOpen: initialIsOpen = false }) {
//  const [isOpen, setIsOpen] = useState(initialIsOpen)
//  const [scrollY, setScrollY] = useState(0)
//  const fileInputRef = useRef<HTMLInputElement>(null)
//  const [ingredients, setIngredients] = useState<Ingredient[]>([])
//  const [newIngredient, setNewIngredient] = useState("")
//  const [recipes, setRecipes] = useState<Recipe[]>([])
//  const [isLoading, setIsLoading] = useState(false)
//  const [selectedImage, setSelectedImage] = useState<string | null>(null)
//
//  useEffect(() => {
//    const handleScroll = () => setScrollY(window.scrollY)
//    window.addEventListener("scroll", handleScroll)
//    return () => window.removeEventListener("scroll", handleScroll)
//  }, [])
//
//  const handleFileUpload = () => {
//    fileInputRef.current?.click()
//  }
//
//  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//    const file = event.target.files?.[0]
//    if (file) {
//      setIsLoading(true)
//      const base64 = await convertToBase64(file)
//      setSelectedImage(base64 as string)
//      await analyzeImage(base64 as string)
//      setIsLoading(false)
//    }
//  }
//
//  const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
//    return new Promise((resolve, reject) => {
//      const reader = new FileReader()
//      reader.readAsDataURL(file)
//      reader.onload = () => resolve(reader.result)
//      reader.onerror = (error) => reject(error)
//    })
//  }
//
//  const analyzeImage = async (base64: string) => {
//    try {
//      const response = await fetch("/api/analyze-image", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({ image: base64 }),
//      })
//      const data = await response.json()
//      setIngredients(data.ingredients)
//    } catch (error) {
//      console.error("Error analyzing image:", error)
//    }
//  }
//
//  const addIngredient = () => {
//    if (newIngredient.trim()) {
//      setIngredients([...ingredients, { name: newIngredient.trim() }])
//      setNewIngredient("")
//    }
//  }
//
//  const removeIngredient = (index: number) => {
//    setIngredients(ingredients.filter((_, i) => i !== index))
//  }
//
//  const generateRecipes = async () => {
//    setIsLoading(true)
//    try {
//      const response = await fetch("/api/generate-recipes", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({ ingredients: ingredients.map((i) => i.name) }),
//      })
//      const data = await response.json()
//      setRecipes(data.recipes)
//    } catch (error) {
//      console.error("Error generating recipes:", error)
//    }
//    setIsLoading(false)
//  }
//
//  return (
//    <div
//      className="fixed z-50 transition-all duration-300 ease-in-out"
//      style={{
//        bottom: isOpen ? "20px" : "20px",
//        right: "20px",
//        transform: `translateY(${isOpen ? "0" : `${Math.min(scrollY, 100)}px`})`,
//      }}
//    >
//      <AnimatePresence>
//        {isOpen && (
//          <motion.div
//            initial={{ opacity: 0, y: 50, scale: 0.3 }}
//            animate={{ opacity: 1, y: 0, scale: 1 }}
//            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
//            className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 h-[600px] flex flex-col"
//          >
//            <div className="flex justify-between items-center mb-4">
//              <h3 className="text-lg font-semibold">Assistant IA</h3>
//              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
//                <X className="h-4 w-4" />
//              </Button>
//            </div>
//            <div className="flex-grow overflow-y-auto mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
//              {selectedImage && (
//                <div className="mb-4">
//                  <Image
//                    src={selectedImage || "/placeholder.svg"}
//                    alt="Selected"
//                    width={200}
//                    height={200}
//                    className="rounded-lg"
//                  />
//                </div>
//              )}
//              <h4 className="font-semibold mb-2">Ingrédients :</h4>
//              <ul>
//                {ingredients.map((ingredient, index) => (
//                  <li key={index} className="flex justify-between items-center mb-2">
//                    <span>{ingredient.name}</span>
//                    <Button variant="ghost" size="sm" onClick={() => removeIngredient(index)}>
//                      <Minus className="h-4 w-4" />
//                    </Button>
//                  </li>
//                ))}
//              </ul>
//              {recipes.length > 0 && (
//                <>
//                  <h4 className="font-semibold mt-4 mb-2">Recettes suggérées :</h4>
//                  <ul>
//                    {recipes.map((recipe, index) => (
//                      <li key={index} className="mb-2">
//                        {recipe.title} (Durée : {recipe.duration} mins)
//                      </li>
//                    ))}
//                  </ul>
//                </>
//              )}
//            </div>
//            <div className="flex flex-col space-y-2">
//              <div className="grid grid-cols-2 gap-2">
//                <Button onClick={handleFileUpload} className="w-full">
//                  <Camera className="h-4 w-4 mr-2" />
//                  <span>Prendre une photo</span>
//                </Button>
//                <Button onClick={handleFileUpload} className="w-full">
//                  <Upload className="h-4 w-4 mr-2" />
//                  <span>Télécharger</span>
//                </Button>
//                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
//              </div>
//              <div className="flex space-x-2">
//                <Input
//                  placeholder="Ajouter un ingrédient"
//                  value={newIngredient}
//                  onChange={(e) => setNewIngredient(e.target.value)}
//                  onKeyPress={(e) => e.key === "Enter" && addIngredient()}
//                />
//                <Button onClick={addIngredient}>
//                  <Plus className="h-4 w-4" />
//                </Button>
//              </div>
//              <Button onClick={generateRecipes} disabled={isLoading}>
//                {isLoading ? (
//                  <>
//                    <svg
//                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                      xmlns="http://www.w3.org/2000/svg"
//                      fill="none"
//                      viewBox="0 0 24 24"
//                    >
//                      <circle
//                        className="opacity-25"
//                        cx="12"
//                        cy="12"
//                        r="10"
//                        stroke="currentColor"
//                        strokeWidth="4"
//                      ></circle>
//                      <path
//                        className="opacity-75"
//                        fill="currentColor"
//                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                      ></path>
//                    </svg>
//                    Chargement...
//                  </>
//                ) : (
//                  <>
//                    <ShoppingCart className="h-4 w-4 mr-2" />
//                    Générer des recettes
//                  </>
//                )}
//              </Button>
//            </div>
//          </motion.div>
//        )}
//      </AnimatePresence>
//      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//        <Button
//          onClick={() => setIsOpen(!isOpen)}
//          className="rounded-full w-16 h-16 glow bg-gradient-to-r from-blue-500 to-purple-600"
//        >
//          <Brain className="h-8 w-8" />
//        </Button>
//      </motion.div>
//    </div>
//  )
//}
//
//"use client"
//
//import { useState, useEffect, useRef } from "react"
//import { motion, AnimatePresence } from "framer-motion"
//import { X, Brain, Camera, Upload, Send, Loader2 } from "lucide-react"
//import { Button } from "@/components/ui/button"
//import { Textarea } from "@/components/ui/textarea"
//
//// Définition des types
//interface Message {
//  type: 'assistant' | 'user';
//  content: string;
//  initial?: boolean;
//}
//
//export function AIShoppingAssistant({ isOpen: initialIsOpen = false }) {
//  const [isOpen, setIsOpen] = useState(initialIsOpen)
//  const [scrollY, setScrollY] = useState(0)
//  const [isLoading, setIsLoading] = useState(false)
//  const [messages, setMessages] = useState<Message[]>([
//    {
//      type: 'assistant',
//      content: "Bonjour ! Je suis votre assistant IA pour vos courses.",
//      initial: true
//    }
//  ])
//  const [isTyping, setIsTyping] = useState(false)
//  const fileInputRef = useRef<HTMLInputElement>(null)
//  const chatContainerRef = useRef<HTMLDivElement>(null)
//  const videoRef = useRef<HTMLVideoElement>(null)
//  const [showCamera, setShowCamera] = useState(false)
//
//  useEffect(() => {
//    const handleScroll = () => setScrollY(window.scrollY)
//    window.addEventListener("scroll", handleScroll)
//    
//    const timer = setTimeout(() => {
//      setIsTyping(true)
//      setTimeout(() => {
//        setMessages(prev => [...prev, {
//          type: 'assistant',
//          content: "Je peux vous aider à :\n• Trouver des produits spécifiques\n• Suggérer des recettes\n• Optimiser votre liste de courses\n• Calculer des quantités"
//        }])
//        setIsTyping(false)
//      }, 2000)
//    }, 3000)
//
//    return () => {
//      window.removeEventListener("scroll", handleScroll)
//      clearTimeout(timer)
//    }
//  }, [])
//
//  const handleCameraAccess = async () => {
//    try {
//      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
//      if (videoRef.current) {
//        videoRef.current.srcObject = stream
//        setShowCamera(true)
//      }
//    } catch (err) {
//      setMessages(prev => [...prev, {
//        type: 'assistant',
//        content: "Désolé, je n'ai pas pu accéder à votre caméra. Veuillez vérifier les autorisations."
//      }])
//    }
//  }
//
//  const takePhoto = () => {
//    if (videoRef.current) {
//      const canvas = document.createElement('canvas')
//      canvas.width = videoRef.current.videoWidth
//      canvas.height = videoRef.current.videoHeight
//      const ctx = canvas.getContext('2d')
//      ctx?.drawImage(videoRef.current, 0, 0)
//      
//      const photo = canvas.toDataURL('image/jpeg')
//      
//      const stream = videoRef.current.srcObject as MediaStream
//      stream.getTracks().forEach(track => track.stop())
//      setShowCamera(false)
//
//      setIsLoading(true)
//      setMessages(prev => [...prev, {
//        type: 'user',
//        content: "Photo prise avec succès"
//      }])
//
//      setTimeout(() => {
//        setIsLoading(false)
//        setMessages(prev => [...prev, {
//          type: 'assistant',
//          content: "J'analyse votre photo... Je vois plusieurs produits intéressants. Que souhaitez-vous savoir à leur sujet ?"
//        }])
//      }, 2000)
//    }
//  }
//
//  const handleFileUpload = () => {
//    fileInputRef.current?.click()
//  }
//
//  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//    const file = event.target.files?.[0]
//    if (file) {
//      setIsLoading(true)
//      setMessages(prev => [...prev, {
//        type: 'user',
//        content: `Image téléchargée : ${file.name}`
//      }])
//
//      setTimeout(() => {
//        setIsLoading(false)
//        setMessages(prev => [...prev, {
//          type: 'assistant',
//          content: "J'analyse votre image... Que souhaitez-vous savoir sur les produits visibles ?"
//        }])
//      }, 2000)
//    }
//  }
//
//  return (
//    <div
//      className="fixed z-50 transition-all duration-300 ease-in-out"
//      style={{
//        bottom: isOpen ? "24px" : "24px",
//        right: "24px",
//        transform: `translateY(${isOpen ? "0" : `${Math.min(scrollY, 100)}px`})`,
//      }}
//    >
//      <AnimatePresence>
//        {isOpen && (
//          <motion.div
//            initial={{ opacity: 0, y: 50, scale: 0.3 }}
//            animate={{ opacity: 1, y: 0, scale: 1 }}
//            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
//            className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
//          >
//            <div className="w-[380px] max-h-[600px] flex flex-col">
//              {/* Header */}
//              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
//                <div className="flex items-center space-x-3">
//                  <Brain className="h-6 w-6 text-primary" />
//                  <h3 className="text-lg font-semibold">YumiMind IA</h3>
//                </div>
//                <Button 
//                  variant="ghost" 
//                  size="icon"
//                  className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
//                  onClick={() => setIsOpen(false)}
//                >
//                  <X className="h-5 w-5" />
//                </Button>
//              </div>
//
//              {/* Chat Container */}
//              <div 
//                ref={chatContainerRef}
//                className="flex-grow overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px] bg-gray-50 dark:bg-gray-900"
//              >
//                {messages.map((message, index) => (
//                  <div key={index} className="flex items-start space-x-3">
//                    {message.type === 'assistant' && (
//                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
//                        <Brain className="h-5 w-5 text-white" />
//                      </div>
//                    )}
//                    <div className={`flex-1 rounded-2xl p-4 shadow-sm ${
//                      message.type === 'assistant' 
//                        ? 'bg-white dark:bg-gray-800' 
//                        : 'bg-blue-500 text-white ml-12'
//                    }`}>
//                      <p className="text-sm whitespace-pre-line">{message.content}</p>
//                    </div>
//                  </div>
//                ))}
//                {isTyping && (
//                  <div className="flex items-start space-x-3">
//                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
//                      <Brain className="h-5 w-5 text-white" />
//                    </div>
//                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
//                      <motion.div
//                        animate={{ opacity: [0.4, 1, 0.4] }}
//                        transition={{ duration: 1.5, repeat: Infinity }}
//                        className="text-sm"
//                      >
//                        ...
//                      </motion.div>
//                    </div>
//                  </div>
//                )}
//              </div>
//
//              {/* Camera View */}
//              {showCamera && (
//                <div className="relative w-full h-[200px] bg-black">
//                  <video
//                    ref={videoRef}
//                    autoPlay
//                    playsInline
//                    className="w-full h-full object-cover"
//                  />
//                  <Button
//                    onClick={takePhoto}
//                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
//                  >
//                    Prendre la photo
//                  </Button>
//                </div>
//              )}
//
//              {/* Input Area */}
//              <div className="p-4 space-y-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
//                <div className="flex space-x-2">
//                  <Button 
//                    onClick={handleCameraAccess}
//                    variant="outline"
//                    className="flex-1 h-10"
//                    disabled={showCamera}
//                  >
//                    <Camera className="h-4 w-4 mr-2" />
//                    Photo
//                  </Button>
//                  <Button 
//                    onClick={handleFileUpload} 
//                    variant="outline"
//                    className="flex-1 h-10"
//                    disabled={isLoading}
//                  >
//                    {isLoading ? (
//                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                    ) : (
//                      <Upload className="h-4 w-4 mr-2" />
//                    )}
//                    Import
//                  </Button>
//                  <input 
//                    type="file" 
//                    ref={fileInputRef} 
//                    onChange={handleFileChange} 
//                    accept="image/*" 
//                    className="hidden" 
//                  />
//                </div>
//                
//                <div className="relative">
//                  <Textarea 
//                    placeholder="Posez votre question ici..."
//                    className="resize-none pr-12 min-h-[80px]"
//                    rows={3}
//                  />
//                  <Button 
//                    className="absolute right-2 bottom-2 rounded-full w-8 h-8 p-0"
//                    size="icon"
//                  >
//                    <Send className="h-4 w-4" />
//                  </Button>
//                </div>
//              </div>
//            </div>
//          </motion.div>
//        )}
//      </AnimatePresence>
//
//      {/* Toggle Button */}
//      <motion.div 
//        whileHover={{ scale: 1.1 }} 
//        whileTap={{ scale: 0.9 }}
//        className="relative"
//      >
//        <Button
//          onClick={() => setIsOpen(!isOpen)}
//          className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
//        >
//          <Brain className="h-8 w-8 text-white" />
//        </Button>
//      </motion.div>
//    </div>
//  )
//}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Brain, Camera, Upload, Send, Loader2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface Message {
  type: "assistant" | "user"
  content: string
}

interface Ingredient {
  name: string
  quantity?: string
  unit?: string
}

export function AIShoppingAssistant({ isOpen: initialIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialIsOpen)
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [detectedIngredients, setDetectedIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatContainerRef]) // Corrected dependency

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendMessage(
        "Bonjour ! Je suis votre assistant culinaire IA. Comment puis-je vous aider aujourd'hui ? 🍽️",
        "assistant",
      )
    }
  }, [isOpen])

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (err) {
      sendMessage("Désolé, je n'ai pas pu accéder à votre caméra. Veuillez vérifier les autorisations.", "assistant")
    }
  }

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(videoRef.current, 0, 0)

      const photo = canvas.toDataURL("image/jpeg")

      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setShowCamera(false)

      analyzeImage(photo)
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photo = e.target?.result as string
        analyzeImage(photo)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async (photo: string) => {
    setIsLoading(true)
    sendMessage("Image téléchargée. Analyse en cours...", "assistant")

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: photo }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'analyse de l'image")
      }

      const data = await response.json()
      setDetectedIngredients(data.ingredients)

      const ingredientsList = data.ingredients.map((ing: Ingredient) => ing.name).join(", ")
      sendMessage(
        `J'ai détecté les ingrédients suivants : ${ingredientsList}. Que souhaitez-vous cuisiner avec ces ingrédients ? 🍳`,
        "assistant",
      )
    } catch (error) {
      console.error("Erreur lors de l'analyse de l'image:", error)
      sendMessage("Désolé, une erreur s'est produite lors de l'analyse de l'image. Veuillez réessayer.", "assistant")
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (content: string, type: "user" | "assistant") => {
    const newMessage: Message = { type, content }
    setMessages((prev) => [...prev, newMessage])

    if (type === "user") {
      setIsLoading(true)
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, newMessage] }),
        })

        if (!response.ok) {
          throw new Error("Erreur lors de la communication avec l'assistant")
        }

        const data = await response.json()
        sendMessage(data.message, "assistant")
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error)
        sendMessage("Désolé, une erreur s'est produite. Veuillez réessayer.", "assistant")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    sendMessage(userInput, "user")
    setUserInput("")
  }

  const renderMessage = (message: Message) => {
    const content = message.content
    const productLinkRegex = /\[Voir les produits\]$$(\/products\?[^$$]+)\)/
    const match = content.match(productLinkRegex)

    if (match) {
      const [fullMatch, url] = match
      const parts = content.split(fullMatch)
      return (
        <>
          {parts[0]}
          <Link href={url} className="text-blue-500 hover:underline">
            <Button variant="outline" size="sm" className="mt-2">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Voir les produits
            </Button>
          </Link>
          {parts[1]}
        </>
      )
    }

    return content
  }

  return (
    <div
      className="fixed z-50 transition-all duration-300 ease-in-out"
      style={{
        bottom: isOpen ? "24px" : "24px",
        right: "24px",
        transform: `translateY(${isOpen ? "0" : `${Math.min(scrollY, 100)}px`})`,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
          >
            <div className="w-[380px] max-h-[600px] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Brain className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Assistant Culinaire IA</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Chat Container */}
              <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px] bg-gray-50 dark:bg-gray-900"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${message.type === "user" ? "justify-end" : ""}`}
                  >
                    {message.type === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`flex-1 rounded-2xl p-4 shadow-sm ${
                        message.type === "assistant" ? "bg-white dark:bg-gray-800" : "bg-blue-500 text-white ml-12"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{renderMessage(message)}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="text-sm"
                      >
                        ...
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera View */}
              {showCamera && (
                <div className="relative w-full h-[200px] bg-black">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <Button onClick={takePhoto} className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    Prendre la photo
                  </Button>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 space-y-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex space-x-2">
                  <Button onClick={handleCameraAccess} variant="outline" className="flex-1 h-10" disabled={showCamera}>
                    <Camera className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button onClick={handleFileUpload} variant="outline" className="flex-1 h-10" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Import
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="Posez votre question ici..."
                    className="resize-none pr-12 min-h-[80px]"
                    rows={3}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    className="absolute right-2 bottom-2 rounded-full w-8 h-8 p-0"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={isLoading || !userInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Brain className="h-8 w-8 text-white" />
        </Button>
      </motion.div>
    </div>
  )
}

