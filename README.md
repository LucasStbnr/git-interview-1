# Interview Git — un cycle GitFlow complet

**Durée : 30 minutes.** L'étape 4 est un bonus, elle ne compte pas dans les 30 minutes.

On simule un cycle de vie classique sur `shopctl`, un petit CLI de calcul de panier :
un sprint en cours, une période de NR, une MEP, puis un incident en production.

> Ce qui est évalué, c'est **le graphe que tu produis** et **la manière dont tu raisonnes** —
> pas ta vitesse de frappe. Commente ce que tu fais à voix haute.

---

## Avant de commencer

**Prérequis :** Node.js et Git. Aucune dépendance à installer.

**Outil libre.** Ligne de commande, Gitoryx, SourceTree, GitKraken, Fork, VS Code, JetBrains,
extension `git flow`… prends ce avec quoi tu es à l'aise.

```bash
git clone https://github.com/LucasStbnr/git-interview-1.git
cd git-interview-1
```

**Tout se passe en local.** Il n'y a rien à pousser, et tu n'as de toute façon pas les
droits d'écriture sur ce dépôt : travaille tranquillement, tu ne peux rien casser.

Crée les branches de travail en local (la dernière est celle sur laquelle démarre l'étape 1) :

```bash
git switch develop
git switch feature/SHOP-101-promo-code
```

Vérifie que le projet tourne :

```bash
node src/cli.js total     # -> Total TTC : ...
node src/cli.js help
```

Pour visualiser ton travail à tout moment :

```bash
git log --oneline --graph --decorate --all
```

**Les règles à respecter sont dans [`GITFLOW.md`](GITFLOW.md).** Lis-le si GitFlow ne te
parle pas, il contient un schéma du cycle. Sinon, retiens juste :
pas de commit direct sur `main` ni `develop`, merge en `--no-ff`, tags annotés sur `main`.

**En cas de blocage**, tu peux repartir de zéro sur une branche :
`git switch -C develop origin/develop`. Le dépôt distant n'est jamais modifié.

---

## État de départ

```
main     : v1.1.0, ce qui tourne en production
develop  : 2 commits d'avance, le sprint est en cours
feature/SHOP-101-promo-code : ticket en cours, 2 commits déjà poussés
```

---

## Étape 1 — Sprint en cours (≈ 8 min)

Le ticket **SHOP-101 « codes promo »** est en cours sur `feature/SHOP-101-promo-code`.
Deux commits ont déjà été faits par un collègue : la table des codes promo et son
application au calcul de la remise.

Le PO ajoute une dernière demande avant la fin du sprint :

> Le code **`WELCOME10`** doit donner **10 % de remise**.

Pendant ce temps, `develop` a avancé : une nouvelle règle métier a été livrée sur
`src/pricing.js` — **une remise ne peut jamais dépasser 50 %**.

**À faire :**

1. Terminer le ticket sur sa branche (la demande du PO).
2. Mettre la branche à jour par rapport à `develop`.
   ⚠️ Il y a un conflit. Attention à ce que tu gardes : **les deux modifications sont
   nécessaires**, la règle des 50 % comme la fonctionnalité du ticket.
3. Intégrer le ticket dans `develop`.
4. Faire le ménage.

**Résultat attendu :** `develop` contient la fonctionnalité *et* la règle métier,
et l'historique montre clairement que le ticket SHOP-101 a été intégré.

Vérification rapide :

```bash
node src/cli.js total --promo=WELCOME10      # remise de 10 %
node src/cli.js total --promo=BLACKFRIDAY    # code a 70 %, mais plafonne a 50 %
```

---

## Étape 2 — Période de NR et MEP (≈ 12 min)

Le sprint est terminé. On entre en **NR (non-régression)** sur la version **`1.2.0`**.

**À faire :**

1. Ouvrir la période de NR : à partir de maintenant, la version en NR est figée,
   `develop` doit rester libre pour le sprint suivant.
2. Passer le projet en `1.2.0` (fichier `VERSION` + `CHANGELOG.md`).
3. La NR remonte un défaut :

   > Le taux de TVA appliqué est **19,6 %**, il devrait être **20 %**.
   > `node src/cli.js total` doit afficher `120.00`, il affiche `119.60`.

   Corrige-le. **Réfléchis bien à l'endroit où ce correctif doit être fait** —
   il doit partir en production avec la `1.2.0`, et ne pas être perdu ensuite.
4. Faire la MEP de la `1.2.0` : la version doit être en production **et** le travail
   de NR ne doit pas se perdre pour la suite.
5. Faire le ménage.

---

## Étape 3 — Incident en production (≈ 10 min)

La `1.2.0` est en prod depuis 20 minutes. Le support remonte un incident bloquant :

> `node src/cli.js summary --empty` plante avec
> `TypeError: Reduce of empty array with no initial value`.
> Un panier vide fait tomber l'application.

Ça ne peut pas attendre le prochain sprint : c'est un **hotfix**, livré en **`1.2.1`**.

**À faire :**

1. Ouvrir le hotfix. ⚠️ **D'où doit-il partir ?** `develop` contient déjà du travail
   qui n'est pas validé pour la production.
2. Corriger le plantage (un panier vide doit afficher un message, pas une stack trace)
   et passer le projet en `1.2.1`.
3. Livrer le hotfix en production, sans que la correction ne disparaisse à la version suivante.
4. Faire le ménage.

**Résultat attendu à la fin des 3 étapes :**

```bash
git log --oneline --graph --decorate --all
```

- `main` : deux nouvelles MEP, tags `v1.2.0` et `v1.2.1`
- `develop` : contient tout le travail des 3 étapes
- aucune branche temporaire ne traîne

---

## Étape 4 — Bonus : post-mortem (hors chrono)

Le défaut de TVA corrigé à l'étape 2 traînait depuis un moment. Le lead demande un
post-mortem :

> Le calcul était **correct au tag `v1.0.0`** et **déjà faux au tag `v1.1.0`**.
> Il y a une vingtaine de commits entre les deux.
>
> **Retrouve le commit exact qui a introduit la régression.**

Pour tester un commit donné :

```bash
node src/cli.js total     # attendu : 120.00 — régression si : 119.60
```

Comment tu t'y prends est libre. Explique ta démarche.
