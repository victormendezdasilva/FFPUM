"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Building } from "lucide-react"

type CountryData = {
  name: string
  phone: string
  email: string
  address: string
  message: string
  officeName?: string
}

interface CountryContactModalProps {
  isOpen: boolean
  onClose: () => void
  countriesData: CountryData[]
}

export function CountryContactModal({ isOpen, onClose, countriesData }: CountryContactModalProps) {
  const [selectedCountryName, setSelectedCountryName] = useState<string>("")
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false)

  const selectedCountryData = countriesData.find((c) => c.name === selectedCountryName)

  const handleSelectCountry = (countryName: string) => {
    setSelectedCountryName(countryName)
    setShowContactInfo(false) // Reset to show "View Info" button
  }

  const handleViewInformation = () => {
    if (selectedCountryName) {
      setShowContactInfo(true)
    }
  }

  const resetAndClose = () => {
    setSelectedCountryName("")
    setShowContactInfo(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="sm:max-w-[480px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {showContactInfo && selectedCountryData
              ? `Contacto en ${selectedCountryData.name}`
              : "Conéctate con Nosotros"}
          </DialogTitle>
          {!showContactInfo && (
            <DialogDescription className="text-gray-600">
              Selecciona tu país para ver la información de contacto y dar el primer paso.
            </DialogDescription>
          )}
        </DialogHeader>

        {!showContactInfo ? (
          <div className="py-4 space-y-4">
            <Select onValueChange={handleSelectCountry} value={selectedCountryName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona tu país" />
              </SelectTrigger>
              <SelectContent>
                {countriesData.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleViewInformation}
              disabled={!selectedCountryName}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Ver Información
            </Button>
          </div>
        ) : selectedCountryData ? (
          <div className="py-4 space-y-4">
            <p className="text-center text-green-700 font-semibold text-lg">{selectedCountryData.message}</p>
            <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
              {selectedCountryData.officeName && (
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-700">Oficina Central</h4>
                    <p className="text-sm text-gray-600">{selectedCountryData.officeName}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{selectedCountryData.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{selectedCountryData.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">{selectedCountryData.address}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                setSelectedCountryName("")
                setShowContactInfo(false)
              }}
              variant="outline"
              className="w-full"
            >
              Seleccionar otro país
            </Button>
          </div>
        ) : null}

        <DialogFooter>
          <Button onClick={resetAndClose} variant="outline">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
