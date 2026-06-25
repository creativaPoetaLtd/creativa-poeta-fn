import {
  Add,
  AutoAwesome,
  Delete,
  Edit,
  OpenInNew,
  PublishedWithChanges,
  Refresh,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  BlogLanguage,
  BlogPost,
  BlogStatus,
  CreateBlog,
  GenerateBlogBatchInput,
  UpdateBlog,
  deleteBlog,
  fetchAdminBlogs,
  generateBlogBatch,
  rebuildBlogSeo,
} from "../APIs/Blogs";

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  language: BlogLanguage;
  translationKey: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  status: BlogStatus;
  imageAlt: string;
  ctaLabel: string;
  ctaUrl: string;
  ctaType: "service" | "affiliate" | "contact";
  affiliateDisclosure: boolean;
};

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Conseils",
  tags: "",
  language: "fr",
  translationKey: "",
  seoTitle: "",
  seoDescription: "",
  focusKeyword: "",
  status: "draft",
  imageAlt: "",
  ctaLabel: "",
  ctaUrl: "",
  ctaType: "service",
  affiliateDisclosure: false,
};

const emptyGenerationForm: GenerateBlogBatchInput = {
  topic: "",
  keywords: "",
  audience: "PME, independants et associations",
  location: "Belgique",
  intent: "informational",
  language: "fr",
  category: "Conseils",
  count: 10,
  ctaLabel: "Decouvrir nos services",
  ctaUrl: "/services",
  ctaType: "service",
};
const formFromBlog = (blog: BlogPost): BlogForm => ({
  title: blog.title,
  slug: blog.slug || "",
  excerpt: blog.excerpt || "",
  content: blog.content,
  category: blog.category || "Conseils",
  tags: (blog.tags || []).join(", "),
  language: blog.language || "fr",
  translationKey: blog.translationKey || "",
  seoTitle: blog.seoTitle || "",
  seoDescription: blog.seoDescription || "",
  focusKeyword: blog.focusKeyword || "",
  status: blog.status || "published",
  imageAlt: blog.imageAlt || "",
  ctaLabel: blog.cta?.label || "",
  ctaUrl: blog.cta?.url || "",
  ctaType: blog.cta?.type || "service",
  affiliateDisclosure: blog.affiliateDisclosure || false,
});

const statusColor = (status?: BlogStatus) => {
  if (status === "published") return "success";
  if (status === "archived") return "default";
  return "warning";
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | BlogStatus>("all");
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [rebuildingSeo, setRebuildingSeo] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [generatorOpen, setGeneratorOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationForm, setGenerationForm] = useState<GenerateBlogBatchInput>(
    emptyGenerationForm
  );

  const loadBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchAdminBlogs();
      setBlogs(response.blogs || []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Impossible de charger les articles."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBlogs();
  }, []);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesStatus =
        status === "all" || (blog.status || "published") === status;
      const matchesSearch =
        !needle ||
        blog.title.toLowerCase().includes(needle) ||
        blog.slug?.toLowerCase().includes(needle) ||
        blog.category?.toLowerCase().includes(needle);
      return matchesStatus && matchesSearch;
    });
  }, [blogs, search, status]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImage(null);
    setError("");
    setMessage("");
    setEditorOpen(true);
  };

  const openEdit = (blog: BlogPost) => {
    setEditing(blog);
    setForm(formFromBlog(blog));
    setImage(null);
    setError("");
    setMessage("");
    setEditorOpen(true);
  };

  const setField = <K extends keyof BlogForm>(
    key: K,
    value: BlogForm[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const setGenerationField = <K extends keyof GenerateBlogBatchInput>(
    key: K,
    value: GenerateBlogBatchInput[K]
  ) => {
    setGenerationForm((current) => ({ ...current, [key]: value }));
  };

  const rebuildStatusMessage = (status?: "queued" | "disabled" | "failed") => {
    if (status === "queued") return " Reconstruction SEO lancee.";
    if (status === "disabled") return " Hook de reconstruction non configure.";
    if (status === "failed") return " Reconstruction SEO non lancee; utilisez le bouton de secours.";
    return "";
  };

  const requestSeoRebuild = async () => {
    setRebuildingSeo(true);
    setError("");
    setMessage("");
    try {
      const response = await rebuildBlogSeo();
      if (response.seoRebuild.status === "queued") {
        setMessage("Reconstruction du frontend et des sitemaps lancee.");
      } else {
        setError(response.seoRebuild.message);
      }
    } catch (rebuildError) {
      setError(
        rebuildError instanceof Error
          ? rebuildError.message
          : "Impossible de lancer la reconstruction SEO."
      );
    } finally {
      setRebuildingSeo(false);
    }
  };
  const generateDrafts = async () => {
    if (generationForm.topic.trim().length < 3) {
      setError("Indiquez un sujet principal suffisamment precis.");
      return;
    }

    setGenerating(true);
    setError("");
    setMessage("");
    try {
      const result = await generateBlogBatch(generationForm);
      await loadBlogs();
      setGeneratorOpen(false);
      setStatus("draft");
      setMessage(
        `${result.created.length} brouillon(s) genere(s) via ${
          result.source === "openai" ? "OpenAI" : "le modele local"
        }. ${result.skipped.length} doublon(s) ignore(s).`
      );
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Impossible de generer les brouillons."
      );
    } finally {
      setGenerating(false);
    }
  };
  const saveBlog = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setError("Le titre et le contenu sont obligatoires.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, String(value));
    });
    if (image) data.append("image", image);

    try {
      if (editing) {
        const response = await UpdateBlog(editing._id, data);
        setMessage(
          `Article mis a jour.${rebuildStatusMessage(response.seoRebuild?.status)}`
        );
      } else {
        const response = await CreateBlog(data);
        setMessage(`Article cree.${rebuildStatusMessage(response.seoRebuild?.status)}`);
      }
      await loadBlogs();
      setTimeout(() => setEditorOpen(false), 600);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Impossible d'enregistrer l'article."
      );
    } finally {
      setSaving(false);
    }
  };

  const removeBlog = async (blog: BlogPost) => {
    if (!window.confirm(`Supprimer definitivement « ${blog.title} » ?`)) return;
    try {
      const response = await deleteBlog(blog._id);
      setBlogs((current) => current.filter((item) => item._id !== blog._id));
      setMessage(
        `Article supprime.${rebuildStatusMessage(response.seoRebuild?.status)}`
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Impossible de supprimer l'article."
      );
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Articles
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Redaction, SEO, traductions et publication.
          </Typography>
        </Box>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => void loadBlogs()}
          >
            Actualiser
          </Button>
          <Button
            variant="outlined"
            startIcon={<PublishedWithChanges />}
            onClick={() => void requestSeoRebuild()}
            disabled={rebuildingSeo}
          >
            {rebuildingSeo ? "Lancement..." : "Reconstruire le SEO"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<AutoAwesome />}
            onClick={() => {
              setError("");
              setMessage("");
              setGeneratorOpen(true);
            }}
            sx={{ fontWeight: 800 }}
          >
            Generer des brouillons
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openCreate}
            sx={{ bgcolor: "#EEBA2B", color: "#071a33", fontWeight: 800 }}
          >
            Nouvel article
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}
      <Stack direction={{ xs: "column", md: "row" }} gap={2} mb={2}>
        <TextField
          size="small"
          label="Rechercher"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          fullWidth
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Statut</InputLabel>
          <Select
            value={status}
            label="Statut"
            onChange={(event) =>
              setStatus(event.target.value as "all" | BlogStatus)
            }
          >
            <MenuItem value="all">Tous</MenuItem>
            <MenuItem value="draft">Brouillons</MenuItem>
            <MenuItem value="published">Publies</MenuItem>
            <MenuItem value="archived">Archives</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {loading ? (
          <Typography p={3} color="text.secondary">
            Chargement...
          </Typography>
        ) : filtered.length === 0 ? (
          <Typography p={3} color="text.secondary">
            Aucun article.
          </Typography>
        ) : (
          filtered.map((blog, index) => (
            <Stack
              key={blog._id}
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "stretch", md: "center" }}
              gap={2}
              p={2}
              sx={{
                borderTop: index ? "1px solid" : "none",
                borderColor: "divider",
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
                  <Typography fontWeight={800} noWrap>
                    {blog.title}
                  </Typography>
                  <Chip
                    size="small"
                    label={blog.status || "published"}
                    color={statusColor(blog.status)}
                  />
                  <Chip
                    size="small"
                    variant="outlined"
                    label={(blog.language || "fr").toUpperCase()}
                  />
                  {blog.generation?.source && blog.generation.source !== "manual" && (
                    <Chip
                      size="small"
                      variant="outlined"
                      icon={<AutoAwesome />}
                      label={blog.generation.source === "openai" ? "OpenAI" : "Modele local"}
                    />
                  )}
                  {typeof blog.generation?.qualityScore === "number" && (
                    <Chip
                      size="small"
                      color={blog.generation.qualityScore >= 80 ? "success" : "warning"}
                      label={`Qualite ${blog.generation.qualityScore}/100`}
                    />
                  )}
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={0.5}
                >
                  /blogs/{blog.slug || blog._id} · {blog.category || "Conseils"}
                </Typography>
              </Box>

              <Stack direction="row" gap={1} flexWrap="wrap">
                {(blog.status || "published") === "published" && (
                  <Button
                    size="small"
                    startIcon={<OpenInNew />}
                    href={`/blogs/${blog.slug || blog._id}`}
                    target="_blank"
                  >
                    Voir
                  </Button>
                )}
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => openEdit(blog)}
                >
                  Modifier
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => void removeBlog(blog)}
                >
                  Supprimer
                </Button>
              </Stack>
            </Stack>
          ))
        )}
      </Box>

      <Dialog
        open={generatorOpen}
        onClose={() => !generating && setGeneratorOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle fontWeight={800}>Generer des brouillons SEO</DialogTitle>
        <DialogContent dividers>
          <Stack gap={2}>
            <Alert severity="info">
              Le generateur cree des brouillons, pas des articles publies. Workflow: generer 10 idees, ouvrir chaque brouillon, verifier les faits et les liens, passer le statut sur Publie, puis reconstruire le SEO.
            </Alert>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Sujet principal"
              value={generationForm.topic}
              onChange={(event) => setGenerationField("topic", event.target.value)}
              placeholder="Ex. visibilite locale pour restaurants"
              required
              fullWidth
            />
            <TextField
              label="Mots-cles ou sujets secondaires"
              value={generationForm.keywords}
              onChange={(event) => setGenerationField("keywords", event.target.value)}
              placeholder="Un mot-cle par ligne"
              helperText="Chaque mot-cle peut devenir un angle distinct."
              multiline
              minRows={3}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <TextField
                label="Public vise"
                value={generationForm.audience}
                onChange={(event) => setGenerationField("audience", event.target.value)}
                fullWidth
              />
              <TextField
                label="Zone geographique"
                value={generationForm.location}
                onChange={(event) => setGenerationField("location", event.target.value)}
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <TextField
                select
                label="Langue"
                value={generationForm.language}
                onChange={(event) =>
                  setGenerationField("language", event.target.value as BlogLanguage)
                }
                fullWidth
              >
                <MenuItem value="fr">Francais</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="nl">Nederlands</MenuItem>
                <MenuItem value="kiny">Kinyarwanda</MenuItem>
              </TextField>
              <TextField
                select
                label="Intention"
                value={generationForm.intent}
                onChange={(event) =>
                  setGenerationField(
                    "intent",
                    event.target.value as GenerateBlogBatchInput["intent"]
                  )
                }
                fullWidth
              >
                <MenuItem value="informational">Informer</MenuItem>
                <MenuItem value="commercial">Aider a choisir</MenuItem>
                <MenuItem value="comparison">Comparer</MenuItem>
                <MenuItem value="local">Recherche locale</MenuItem>
              </TextField>
              <TextField
                label="Nombre"
                type="number"
                value={generationForm.count}
                onChange={(event) =>
                  setGenerationField(
                    "count",
                    Math.min(10, Math.max(1, Number(event.target.value) || 1))
                  )
                }
                inputProps={{ min: 1, max: 10 }}
                sx={{ minWidth: 120 }}
              />
            </Stack>
            <TextField
              label="Categorie"
              value={generationForm.category}
              onChange={(event) => setGenerationField("category", event.target.value)}
              fullWidth
            />
            <Typography variant="subtitle2" fontWeight={800}>
              Conversion
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <TextField
                label="Texte du CTA"
                value={generationForm.ctaLabel}
                onChange={(event) => setGenerationField("ctaLabel", event.target.value)}
                fullWidth
              />
              <TextField
                label="URL du CTA"
                value={generationForm.ctaUrl}
                onChange={(event) => setGenerationField("ctaUrl", event.target.value)}
                placeholder="/services/..."
                fullWidth
              />
              <TextField
                select
                label="Type"
                value={generationForm.ctaType}
                onChange={(event) =>
                  setGenerationField(
                    "ctaType",
                    event.target.value as GenerateBlogBatchInput["ctaType"]
                  )
                }
                sx={{ minWidth: 145 }}
              >
                <MenuItem value="service">Service</MenuItem>
                <MenuItem value="contact">Contact</MenuItem>
                <MenuItem value="affiliate">Affilie</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setGeneratorOpen(false)} disabled={generating}>
            Annuler
          </Button>
          <Button
            variant="contained"
            startIcon={<AutoAwesome />}
            onClick={() => void generateDrafts()}
            disabled={generating}
            sx={{ bgcolor: "#EEBA2B", color: "#071a33", fontWeight: 800 }}
          >
            {generating ? "Generation..." : "Creer les brouillons"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editorOpen}
        onClose={() => !saving && setEditorOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { maxHeight: "94vh" } }}
      >
        <DialogTitle fontWeight={800}>
          {editing ? "Modifier l'article" : "Nouvel article"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack gap={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            {editing?.generation?.source && editing.generation.source !== "manual" && (
              <Alert
                severity={
                  (editing.generation.qualityScore || 0) >= 80 ? "success" : "warning"
                }
              >
                Brouillon genere via {editing.generation.source === "openai" ? "OpenAI" : "le modele local"}
                {typeof editing.generation.qualityScore === "number"
                  ? ` - qualite ${editing.generation.qualityScore}/100`
                  : ""}
                {editing.generation.qualityIssues?.length
                  ? ` - A verifier : ${editing.generation.qualityIssues.join(" ")}`
                  : " - Les controles automatiques sont satisfaits; une relecture humaine reste requise."}
              </Alert>
            )}

            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <TextField
                label="Titre"
                value={form.title}
                onChange={(event) => setField("title", event.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Slug"
                value={form.slug}
                onChange={(event) => setField("slug", event.target.value)}
                helperText="Laisser vide pour le generer depuis le titre."
                fullWidth
              />
            </Stack>

            <TextField
              label="Resume"
              value={form.excerpt}
              onChange={(event) => setField("excerpt", event.target.value)}
              multiline
              minRows={2}
              inputProps={{ maxLength: 420 }}
              helperText={`${form.excerpt.length}/420`}
            />

            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <TextField
                select
                label="Langue"
                value={form.language}
                onChange={(event) =>
                  setField("language", event.target.value as BlogLanguage)
                }
                fullWidth
              >
                <MenuItem value="fr">Francais</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="nl">Nederlands</MenuItem>
                <MenuItem value="kiny">Kinyarwanda</MenuItem>
              </TextField>
              <TextField
                select
                label="Statut"
                value={form.status}
                onChange={(event) =>
                  setField("status", event.target.value as BlogStatus)
                }
                fullWidth
              >
                <MenuItem value="draft">Brouillon</MenuItem>
                <MenuItem value="published">Publie</MenuItem>
                <MenuItem value="archived">Archive</MenuItem>
              </TextField>
              <TextField
                label="Categorie"
                value={form.category}
                onChange={(event) => setField("category", event.target.value)}
                fullWidth
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <TextField
                label="Tags"
                value={form.tags}
                onChange={(event) => setField("tags", event.target.value)}
                helperText="Separes par des virgules"
                fullWidth
              />
              <TextField
                label="Cle de traduction"
                value={form.translationKey}
                onChange={(event) =>
                  setField("translationKey", event.target.value)
                }
                helperText="Identique pour les versions traduites"
                fullWidth
              />
            </Stack>

            <Box>
              <Typography variant="subtitle2" fontWeight={800} mb={1}>
                Contenu
              </Typography>
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={(value) => setField("content", value)}
                style={{ minHeight: 260, marginBottom: 44 }}
              />
            </Box>

            <Typography variant="h6" fontWeight={800} mt={1}>
              SEO
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <TextField
                label="Titre SEO"
                value={form.seoTitle}
                onChange={(event) => setField("seoTitle", event.target.value)}
                inputProps={{ maxLength: 70 }}
                helperText={`${form.seoTitle.length}/70`}
                fullWidth
              />
              <TextField
                label="Mot-cle principal"
                value={form.focusKeyword}
                onChange={(event) =>
                  setField("focusKeyword", event.target.value)
                }
                fullWidth
              />
            </Stack>
            <TextField
              label="Description SEO"
              value={form.seoDescription}
              onChange={(event) =>
                setField("seoDescription", event.target.value)
              }
              multiline
              minRows={2}
              inputProps={{ maxLength: 180 }}
              helperText={`${form.seoDescription.length}/180`}
            />

            <Typography variant="h6" fontWeight={800} mt={1}>
              Image et conversion
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <Button variant="outlined" component="label" sx={{ minHeight: 56 }}>
                {image ? image.name : "Choisir une image"}
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setImage(event.target.files?.[0] || null)
                  }
                />
              </Button>
              <TextField
                label="Texte alternatif de l'image"
                value={form.imageAlt}
                onChange={(event) => setField("imageAlt", event.target.value)}
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <TextField
                label="Texte du CTA"
                value={form.ctaLabel}
                onChange={(event) => setField("ctaLabel", event.target.value)}
                fullWidth
              />
              <TextField
                label="URL du CTA"
                value={form.ctaUrl}
                onChange={(event) => setField("ctaUrl", event.target.value)}
                placeholder="/services/... ou https://..."
                fullWidth
              />
              <TextField
                select
                label="Type de CTA"
                value={form.ctaType}
                onChange={(event) =>
                  setField(
                    "ctaType",
                    event.target.value as BlogForm["ctaType"]
                  )
                }
                sx={{ minWidth: 170 }}
              >
                <MenuItem value="service">Service</MenuItem>
                <MenuItem value="contact">Contact</MenuItem>
                <MenuItem value="affiliate">Affilie</MenuItem>
              </TextField>
            </Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.affiliateDisclosure}
                  onChange={(event) =>
                    setField("affiliateDisclosure", event.target.checked)
                  }
                />
              }
              label="Afficher la mention de liens affilies"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditorOpen(false)} disabled={saving}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={() => void saveBlog()}
            disabled={saving}
            sx={{ bgcolor: "#EEBA2B", color: "#071a33", fontWeight: 800 }}
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Blogs;