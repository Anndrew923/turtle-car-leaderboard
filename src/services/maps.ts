/// <reference types="@types/google.maps" />
import { Loader } from "@googlemaps/js-api-loader";

export class MapsService {
  private static loader: Loader | null = null;
  private static map: google.maps.Map | null = null;

  // Initialize Google Maps
  static async initializeMap(
    containerId: string,
    center: { lat: number; lng: number },
    zoom: number = 10
  ): Promise<google.maps.Map> {
    if (!this.loader) {
      this.loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places", "geometry"],
      });
    }

    try {
      const google = await this.loader.load();

      const mapElement = document.getElementById(containerId);
      if (!mapElement) {
        throw new Error("Map container not found");
      }

      this.map = new google.maps.Map(mapElement, {
        center,
        zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      return this.map;
    } catch (error) {
      console.error("Error initializing map:", error);
      throw new Error("地圖初始化失敗");
    }
  }

  // Get current location
  static async getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("此瀏覽器不支援地理定位"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject(new Error("無法獲取位置資訊"));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  }

  // Geocode address to coordinates
  static async geocodeAddress(
    address: string
  ): Promise<{ lat: number; lng: number }> {
    if (!this.loader) {
      this.loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });
    }

    try {
      const google = await this.loader.load();
      const geocoder = new google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng(),
            });
          } else {
            reject(new Error("地址解析失敗"));
          }
        });
      });
    } catch (error) {
      console.error("Error geocoding address:", error);
      throw new Error("地址解析失敗");
    }
  }

  // Reverse geocode coordinates to address
  static async reverseGeocode(lat: number, lng: number): Promise<string> {
    if (!this.loader) {
      this.loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });
    }

    try {
      const google = await this.loader.load();
      const geocoder = new google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject(new Error("座標解析失敗"));
          }
        });
      });
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      throw new Error("座標解析失敗");
    }
  }

  // Add marker to map
  static addMarker(
    map: google.maps.Map,
    position: { lat: number; lng: number },
    title?: string,
    icon?: string
  ): google.maps.Marker {
    return new google.maps.Marker({
      position,
      map,
      title,
      icon: icon
        ? {
            url: icon,
            scaledSize: new google.maps.Size(32, 32),
          }
        : undefined,
    });
  }

  // Get map instance
  static getMap(): google.maps.Map | null {
    return this.map;
  }
}
