"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, RefreshCw } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    plasticBottleTokens: 5,
    aluminumCanTokens: 3,
    glassBottleTokens: 4,
    minRedemptionAmount: 50,
    platformFee: 0,
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600 mt-1">Configure system parameters</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Rewards</CardTitle>
            <CardDescription>
              Configure token values for different item types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plastic">Plastic Bottle (Tokens)</Label>
                <Input
                  id="plastic"
                  type="number"
                  value={settings.plasticBottleTokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      plasticBottleTokens: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aluminum">Aluminum Can (Tokens)</Label>
                <Input
                  id="aluminum"
                  type="number"
                  value={settings.aluminumCanTokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aluminumCanTokens: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="glass">Glass Bottle (Tokens)</Label>
                <Input
                  id="glass"
                  type="number"
                  value={settings.glassBottleTokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      glassBottleTokens: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redemption Settings</CardTitle>
            <CardDescription>
              Configure minimum redemption amounts and fees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minRedemption">
                  Minimum Redemption Amount (₹)
                </Label>
                <Input
                  id="minRedemption"
                  type="number"
                  value={settings.minRedemptionAmount}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      minRedemptionAmount: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platformFee">Platform Fee (%)</Label>
                <Input
                  id="platformFee"
                  type="number"
                  value={settings.platformFee}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      platformFee: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Monitor system health and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Status</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Status</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Backup</span>
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}
