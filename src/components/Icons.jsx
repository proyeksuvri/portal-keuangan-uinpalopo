"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Re-exporting common icons for easy access
 * This maintains the Icons object structure but uses the lucide-react library
 */
export const Icons = {
  Building2: LucideIcons.Building2,
  ExternalLink: LucideIcons.ExternalLink,
  FileText: LucideIcons.FileText,
  Newspaper: LucideIcons.Newspaper,
  AlertCircle: LucideIcons.AlertCircle,
  Search: LucideIcons.Search,
  ChevronRight: LucideIcons.ChevronRight,
  BookOpen: LucideIcons.BookOpen,
  Landmark: LucideIcons.Landmark,
  Calculator: LucideIcons.Calculator,
  ShieldCheck: LucideIcons.ShieldCheck,
  Calendar: LucideIcons.Calendar,
  User: LucideIcons.User,
  LogOut: LucideIcons.LogOut,
  Lock: LucideIcons.Lock,
  Plus: LucideIcons.Plus,
  Edit: LucideIcons.Edit,
  Trash2: LucideIcons.Trash2,
  X: LucideIcons.X,
  Image: LucideIcons.Image,
  LayoutDashboard: LucideIcons.LayoutDashboard,
  LineChart: LucideIcons.LineChart,
  PieChart: LucideIcons.PieChart,
  Bell: LucideIcons.Bell,
  Menu: LucideIcons.Menu,
  Activity: LucideIcons.Activity,
  Type: LucideIcons.Type,
};

/**
 * Render icon based on string name (used for dynamic icons from GAS)
 */
export function renderIcon(iconName, props = {}) {
  const IconComponent = LucideIcons[iconName] || LucideIcons.ExternalLink;
  return <IconComponent {...props} />;
}

export default Icons;