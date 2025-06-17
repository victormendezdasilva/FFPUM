"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Phone, Mail, MapPin, Star, BookOpen, Handshake, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CountryContactModal } from "@/components/country-contact-modal"

type CountryData = {
  name: string
  phone: string
  email: string
  address: string
  message: string
  officeName?: string
}

const contactDetails: CountryData[] = [
  {
    name: "Argentina",
    officeName: "FFPUM Argentina",
    phone: "+54 11 2345 6789",
    email: "argentina@ffpum-subregion2.org",
    address: "Av. Corrientes 1234, Buenos Aires, Argentina",
    message: "¡Conéctate con nosotros en Argentina y sé parte del cambio hacia un mundo de paz!",
  },
  {
    name: "Paraguay",
    officeName: "FFPUM Paraguay",
    phone: "+595 21 345 6789",
    email: "paraguay@ffpum-subregion2.org",
    address: "Calle Palma 567, Asunción, Paraguay",
    message: "¡Únete a la familia FFPUM en Paraguay y construyamos juntos un futuro de armonía!",
  },
  {
    name: "Uruguay",
    officeName: "FFPUM Uruguay",
    phone: "+598 2 456 7890",
    email: "uruguay@ffpum-subregion2.org",
    address: "18 de Julio 910, Montevideo, Uruguay",
    message: "¡Te esperamos en Uruguay para fortalecer los lazos de paz y unidad!",
  },
  {
    name: "Chile",
    officeName: "FFPUM Chile",
    phone: "+56 2 5678 9012",
    email: "chile@ffpum-subregion2.org",
    address: "Alameda 345, Santiago, Chile",
    message: "¡Súmate al movimiento por la paz en Chile y inspiremos juntos a la nación!",
  },
]

function ImageCarousel({ images, className = "", zoomLevel = "zoom-effect-10", objectPosition = "center" }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isZooming, setIsZooming] = useState(true)

  useEffect(() => {
    setIsZooming(true)
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        setIsVisible(true)
        setIsZooming(true)
      }, 400)
    }, 8000)
    return () => clearInterval(interval)
  }, [images.length, currentIndex])

  return (
    <div className={`relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-lg ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          width={400}
          height={300}
          className={`w-full h-full object-cover transition-all duration-400 ${
            isVisible ? "opacity-100" : "opacity-0 scale-110"
          } ${isZooming && isVisible ? zoomLevel : ""}`}
          style={{ objectPosition }}
        />
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Component() {
  const familyImages = [
    { src: "/images/family1.jpg", alt: "Pareja joven trabajando juntos" },
    { src: "/images/family2.jpg", alt: "Familia feliz en casa" },
    { src: "/images/family3.jpg", alt: "Pareja madura en el patio" },
    { src: "/images/family4.jpg", alt: "Pareja mayor en evento comunitario" },
    { src: "/images/family5.jpg", alt: "Pareja disfrutando en restaurante" },
  ]

  const actividadesImages = [
    { src: "/images/actividades1.jpg", alt: "Jóvenes compartiendo una comida comunitaria" },
    { src: "/images/actividades2.jpg", alt: "Taller educativo con familias" },
    { src: "/images/actividades3.jpg", alt: "Seminario HyoJeong CheonBo" },
    { src: "/images/actividades4.jpg", alt: "Encuentro internacional en Brasil" },
    { src: "/images/actividades5.jpg", alt: "Celebración comunitaria con familias" },
  ]

  const jovenesImages = [
    { src: "/images/jovenes1.jpg", alt: "Orador en evento de FFPUM" },
    { src: "/images/jovenes2.jpg", alt: "Joven mujer compartiendo testimonio" },
    { src: "/images/jovenes3.jpg", alt: "Participante compartiendo experiencia" },
    { src: "/images/jovenes4.jpg", alt: "Grupo musical juvenil con guitarra", zoom: true },
    { src: "/images/jovenes5.jpg", alt: "Banda de jóvenes en presentación musical", zoom: true },
  ]

  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/ffpum-logo.png"
                    alt="Logo FFPUM"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">FFPUM</h1>
                  <p className="text-xs text-gray-600">Federación de Familias para la Paz</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <Link href="#inicio" className="text-gray-700 hover:text-green-600 transition-colors">
                  Inicio
                </Link>
                <Link href="#actividades" className="text-gray-700 hover:text-green-600 transition-colors">
                  Qué Hacemos
                </Link>
                <Link href="#valores" className="text-gray-700 hover:text-green-600 transition-colors">
                  Valores
                </Link>
                <Link href="#fundadores" className="text-gray-700 hover:text-green-600 transition-colors">
                  Fundadores
                </Link>
                <Link href="#historia" className="text-gray-700 hover:text-green-600 transition-colors">
                  Historia
                </Link>
                <Link href="#contacto" className="text-gray-700 hover:text-green-600 transition-colors">
                  Contacto
                </Link>
              </nav>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                Únete a Nosotros
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="inicio" className="py-20 px-4 scroll-mt-24">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
                Construyendo un Mundo de Paz y Unidad
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Federación de Familias para la
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}
                  Paz y Unificación Mundial
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Promovemos valores familiares sólidos, la paz mundial y la unificación de la humanidad a través del amor
                verdadero, la armonía intercultural y el servicio desinteresado a la comunidad global.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Conoce Nuestra Misión
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Users className="w-5 h-5 mr-2" />
                  Únete a la Comunidad
                </Button>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                <ImageCarousel images={familyImages} />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                <ImageCarousel images={actividadesImages} />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                <ImageCarousel
                  images={jovenesImages}
                  zoomLevel={jovenesImages[carouselCurrentIndex]?.zoom ? "zoom-effect-20" : "zoom-effect-10"}
                  objectPosition="center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Actividades y Misión Section (Qué Hacemos) */}
        <section id="actividades" className="py-10 bg-gradient-to-b from-gray-50 to-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Qué Hacemos</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Nuestras actividades abarcan múltiples áreas, todas orientadas hacia la construcción de familias
                  fuertes y una sociedad pacífica.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Educación Familiar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Programas educativos para fortalecer los vínculos familiares y promover valores sólidos.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Seminarios de matrimonio</li>
                      <li>• Educación de padres</li>
                      <li>• Programas juveniles</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Diálogo Interreligioso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Facilitamos el entendimiento y la cooperación entre diferentes tradiciones religiosas.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Conferencias de paz</li>
                      <li>• Encuentros interreligiosos</li>
                      <li>• Proyectos colaborativos</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">Servicio Comunitario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Iniciativas de servicio para mejorar las comunidades locales y globales.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Proyectos ambientales</li>
                      <li>• Ayuda humanitaria</li>
                      <li>• Voluntariado juvenil</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-teal-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-3xl mb-4">Nuestra Misión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed text-green-100">
                      Promover la paz mundial y la unificación de la humanidad a través del fortalecimiento de los
                      valores familiares, el amor verdadero y el servicio desinteresado, creando una sociedad donde
                      todas las personas puedan vivir en armonía como una gran familia global.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl mb-4 text-gray-900">Nuestra Visión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed text-gray-600">
                      Un mundo donde la paz prevalezca sobre el conflicto, donde las familias sean el fundamento de
                      sociedades prósperas, y donde todas las personas, independientemente de su origen, vivan unidas
                      bajo los principios del amor verdadero y el respeto mutuo.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores Section */}
        <section id="valores" className="py-10 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestros Valores Fundamentales</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Los principios que guían nuestras acciones y definen nuestra identidad como movimiento global.
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Amor Incondicional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Practicamos y enseñamos el amor que trasciende barreras y diferencias.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Unidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Promovemos la armonía entre personas de todas las culturas y creencias.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Handshake className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Servicio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Vivimos para el bien de los demás y el beneficio de toda la humanidad.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Integridad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Actuamos con honestidad y transparencia en todas nuestras interacciones.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Fundadores Section */}
        <section id="fundadores" className="py-10 bg-gradient-to-r from-green-50 to-teal-50 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestros Fundadores</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Conoce a los visionarios que dedicaron sus vidas a la construcción de un mundo de paz y unidad.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src="/images/rev-sun-myung-moon.jpg"
                          alt="Rev. Sun Myung Moon"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Rev. Sun Myung Moon</CardTitle>
                      <CardDescription className="text-lg">Fundador y Padre Verdadero</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 leading-relaxed">
                        Visionario de la paz mundial y la unificación de la humanidad bajo el amor de Dios. Dedicó su
                        vida a enseñar los principios del amor verdadero y la familia ideal.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src="/images/dra-hak-ja-han-moon.jpg"
                          alt="Dra. Hak Ja Han Moon"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Dra. Hak Ja Han Moon</CardTitle>
                      <CardDescription className="text-lg">Co-fundadora y Madre Verdadera</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 leading-relaxed">
                        Líder mundial en la promoción de la paz, los valores familiares y el empoderamiento de la mujer
                        como pilar fundamental de la sociedad.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-8">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-teal-600 text-white">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center">
                        <BookOpen className="w-6 h-6 mr-3" />
                        Enseñanzas Centrales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Los Cuatro Grandes Reinos del Corazón
                        </h4>
                        <p className="text-green-100">
                          El corazón de hijo, hermano, esposo/padre y abuelo como fundamentos del amor verdadero.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Las Tres Grandes Bendiciones
                        </h4>
                        <p className="text-green-100">
                          Perfección individual, familia ideal y dominio sobre la creación con amor.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Vivir por el Bien de los Demás
                        </h4>
                        <p className="text-green-100">
                          El principio fundamental del altruismo y el servicio desinteresado.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl">Legado de Paz</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        A través de décadas de trabajo incansable, nuestros fundadores establecieron las bases para un
                        movimiento mundial de paz que continúa creciendo y transformando vidas en todos los continentes.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Historia Section */}
        <section id="historia" className="py-10 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Un recorrido por los hitos que han marcado nuestra trayectoria y definido nuestra misión a lo largo de
                las décadas.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">1954 - Fundación y Enseñanza Central</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Fundación de la Asociación del Espíritu Santo para la Unificación del Cristianismo Mundial (Iglesia
                    de Unificación) en Corea del Sur. Publicación de "El Principio Divino", nuestra enseñanza central
                    que articula la cosmovisión de nuestro movimiento, convirtiéndose en la base de nuestra enseñanza.
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    1958 en adelante - Expansión Misionera Global
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Expansión misionera a Japón (1958), Estados Unidos (1959 y 1971), y luego a Europa y el resto del
                    mundo, llevando el mensaje de paz y unificación.
                  </p>
                </div>
                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Años 60 en adelante - Ceremonias de Bendición Matrimonial
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    A partir de los años 60 se celebran las Ceremonias de Bendición Matrimonial Internacional, creciendo
                    en escala. La Bendición une a parejas de diferentes nacionalidades y razas, creando familias
                    centradas en Dios y estableciendo el ideal de Una Familia Bajo Dios como base para la paz.
                  </p>
                </div>
                <div className="border-l-4 border-teal-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Desarrollo Continuo - Red de Organizaciones para la Paz
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    El Reverendo Moon y la Dra. Hak Ja Han Moon fundaron una amplia red de organizaciones para promover
                    la paz y sus ideales en diversos campos como el diálogo interreligioso, medios de comunicación,
                    artes, educación, negocios y el servicio voluntario.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">1994 - Establecimiento de FFPUM</h3>
                  <p className="text-gray-600 leading-relaxed">
                    La Asociación del Espíritu Santo para la Unificación del Cristianismo Mundial (USA-UWC) es
                    reorganizada y se establece la Federación de Familias para la Paz y Unificación Mundial (FFPUM),
                    enfatizando aún más el papel central de la familia en la consecución de la paz mundial.
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2012 - Continuación del Legado</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tras la ascensión al mundo espiritual del Reverendo Sun Myung Moon en 2012, la Dra. Hak Ja Han Moon
                    asume el liderazgo principal del movimiento, continuando e impulsando la visión establecida por los
                    fundadores.
                  </p>
                </div>
                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Presente - Impacto Global Sostenido</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Con presencia activa en numerosos países, la FFPUM continúa promoviendo la paz, los valores
                    familiares y el diálogo interreligioso, adaptándose a los desafíos del siglo XXI y buscando
                    construir un mundo de interdependencia, prosperidad mutua y valores universalmente compartidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto Section */}
        <section id="contacto" className="py-10 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Contacto - Subregión 2</h2>
                <p className="text-lg text-gray-600">
                  Conecta con nosotros en cualquiera de los países de nuestra subregión
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactDetails.map((country) => (
                  <Card key={country.name} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{country.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{country.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{country.email}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                        <span className="text-sm">{country.address}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-teal-600 text-white max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl">¿Quieres Saber Más?</CardTitle>
                    <CardDescription className="text-green-100">
                      Únete a nuestra comunidad global y sé parte del cambio hacia un mundo más pacífico
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        size="lg"
                        variant="secondary"
                        className="bg-white text-green-600 hover:bg-gray-100"
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        Conoce Más
                      </Button>
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        size="lg"
                        variant="secondary"
                        className="bg-white text-green-600 hover:bg-gray-100"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Únete Ahora
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/images/ffpum-logo.png"
                      alt="Logo FFPUM"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">FFPUM</h3>
                    <p className="text-xs text-gray-400">Subregión 2</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Construyendo un mundo de paz y unidad a través del amor verdadero y los valores familiares.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Organizaciones Afiliadas</h4>
                <ul className="space-y-2 text-sm text-gray-400 pl-0">
                  <li>UPF - Federación para la Paz Universal</li>
                  <li>CARP - Asociación Colegial para la Investigación de Principios</li>
                  <li>FMPM - Federación de Mujeres para la Paz Mundial</li>
                  <li>YSP - Servicio de Paz Juvenil</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
                <ul className="space-y-2 text-sm text-gray-400 pl-0">
                  <li>
                    <Link href="#inicio" className="hover:text-white transition-colors">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="#actividades" className="hover:text-white transition-colors">
                      Qué Hacemos
                    </Link>
                  </li>
                  <li>
                    <Link href="#valores" className="hover:text-white transition-colors">
                      Valores
                    </Link>
                  </li>
                  <li>
                    <Link href="#fundadores" className="hover:text-white transition-colors">
                      Fundadores
                    </Link>
                  </li>
                  <li>
                    <Link href="#historia" className="hover:text-white transition-colors">
                      Historia
                    </Link>
                  </li>
                  <li>
                    <Link href="#contacto" className="hover:text-white transition-colors">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Contacto General</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>info@ffpum-subregion2.org</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>www.ffpum-subregion2.org</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Federación de Familias para la Paz y Unificación Mundial - Subregión 2.
                Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <CountryContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} countriesData={contactDetails} />
    </>
  )
}
