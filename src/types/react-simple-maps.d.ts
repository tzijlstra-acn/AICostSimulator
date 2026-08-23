declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, SVGProps, MouseEvent, KeyboardEvent } from 'react';

  export interface GeographyProps {
    geography: GeoObject;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties & { outline?: string; cursor?: string };
      hover?: React.CSSProperties & { outline?: string; cursor?: string };
      pressed?: React.CSSProperties & { outline?: string };
    };
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    tabIndex?: number;
    'aria-label'?: string;
    className?: string;
  }

  export interface GeoObject {
    rsmKey: string;
    properties: Record<string, unknown>;
    geometry: unknown;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (args: { geographies: GeoObject[] }) => ReactNode;
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      rotate?: [number, number, number];
      scale?: number;
      center?: [number, number];
    };
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }

  export interface ZoomableGroupProps {
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Graticule: ComponentType<SVGProps<SVGPathElement>>;
  export const Sphere: ComponentType<SVGProps<SVGPathElement>>;
  export const Line: ComponentType<{
    from: [number, number];
    to: [number, number];
    coordinates?: [[number, number], [number, number]];
    stroke?: string;
    strokeWidth?: number;
  }>;
  export const Marker: ComponentType<{
    coordinates: [number, number];
    children?: ReactNode;
  }>;
  export const Annotation: ComponentType<{
    subject: [number, number];
    children?: ReactNode;
    dx?: number;
    dy?: number;
  }>;
}
