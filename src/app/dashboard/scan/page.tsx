"use client"

import { useState } from "react"
import { Scanner } from "@yudiel/react-qr-scanner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Camera, CheckCircle, XCircle, Keyboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function ScanPage() {
  const { toast } = useToast()
  const [scanning, setScanning] = useState(false)
  const [manualCode, setManualCode] = useState("")
  const [scanResult, setScanResult] = useState<any>(null)

  const handleScan = async (result: any) => {
    if (result) {
      setScanning(false)
      await processQRCode(result[0].rawValue)
    }
  }

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await processQRCode(manualCode)
  }

  const processQRCode = async (qrCode: string) => {
    try {
      const res = await fetch("/api/qr/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "dummy-user-id", // Replace with actual user ID from auth
          qrCode,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setScanResult({
          success: true,
          tokensEarned: data.tokensEarned,
          newBalance: data.newBalance,
        })
        toast({
          title: "Success! 🎉",
          description: `You earned ${data.tokensEarned} tokens!`,
        })
      } else {
        setScanResult({
          success: false,
          message: data.message,
        })
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to scan QR code. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Scan QR Code
          </h1>
          <p className="text-gray-600 mb-8">
            Scan the QR code from the RVM to earn tokens
          </p>

          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="camera">
                <Camera className="w-4 h-4 mr-2" />
                Camera Scan
              </TabsTrigger>
              <TabsTrigger value="manual">
                <Keyboard className="w-4 h-4 mr-2" />
                Manual Entry
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera">
              <Card>
                <CardHeader>
                  <CardTitle>Camera Scanner</CardTitle>
                  <CardDescription>
                    Point your camera at the QR code displayed on the RVM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!scanning && !scanResult && (
                      <Button
                        onClick={() => setScanning(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        size="lg"
                      >
                        <QrCode className="w-5 h-5 mr-2" />
                        Start Scanning
                      </Button>
                    )}

                    {scanning && (
                      <div className="space-y-4">
                        <div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden bg-black">
                          <Scanner
                            onScan={handleScan}
                            onError={(error) => {
                              console.error(error)
                              setScanning(false)
                              toast({
                                title: "Camera Error",
                                description: "Failed to access camera. Please check permissions.",
                                variant: "destructive",
                              })
                            }}
                            components={{
                              audio: false,
                              finder: true,
                            }}
                            styles={{
                              container: {
                                width: "100%",
                                height: "100%",
                              },
                            }}
                          />
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setScanning(false)}
                          className="w-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}

                    {scanResult && <ScanResult result={scanResult} onReset={() => setScanResult(null)} />}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Code Entry</CardTitle>
                  <CardDescription>
                    Enter the code manually if camera scanning is not available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="qrCode">QR Code</Label>
                      <Input
                        id="qrCode"
                        placeholder="RVM-12345-ABCDEF"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      size="lg"
                    >
                      Submit Code
                    </Button>
                  </form>

                  {scanResult && <ScanResult result={scanResult} onReset={() => setScanResult(null)} />}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

function ScanResult({ result, onReset }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-6"
    >
      <Card className={result.success ? "border-emerald-500" : "border-red-500"}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            {result.success ? (
              <>
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900">Success!</h3>
                <p className="text-gray-600">You earned</p>
                <p className="text-5xl font-bold text-emerald-600">
                  +{result.tokensEarned} Tokens
                </p>
                <p className="text-sm text-gray-500">
                  New Balance: {result.newBalance} tokens
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-600 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900">Error</h3>
                <p className="text-gray-600">{result.message}</p>
              </>
            )}
            <Button
              onClick={onReset}
              variant="outline"
              className="mt-4"
            >
              Scan Another Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
