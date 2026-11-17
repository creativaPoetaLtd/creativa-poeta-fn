import { Route, Routes } from "react-router-dom";
import { ArtCatalogProvider, ArtSelectionProvider } from "../contexts/ArtContext";
import { ArtHomePage, ArtCollectionsPage, ArtCollectionPage, ArtGalleryPage, ArtWorkPage, ArtCustomPage, ArtSelectionPage, ArtOrderPage } from "./ArtPage";
export default function ArtRoutes() {
  return <ArtCatalogProvider><ArtSelectionProvider><Routes>
    <Route index element={<ArtHomePage />} />
    <Route path="collections" element={<ArtCollectionsPage />} />
    <Route path="collections/:slug" element={<ArtCollectionPage />} />
    <Route path="galerie" element={<ArtGalleryPage />} />
    <Route path="oeuvres/:slug" element={<ArtWorkPage />} />
    <Route path="personnalisation" element={<ArtCustomPage />} />
    <Route path="commande" element={<ArtOrderPage />} />
    <Route path="selection" element={<ArtSelectionPage />} />
    <Route path="*" element={<ArtGalleryPage />} />
  </Routes></ArtSelectionProvider></ArtCatalogProvider>;
}
