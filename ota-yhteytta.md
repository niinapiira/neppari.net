---
forms: true
"page-title": Ota yhteyttä
"page-type": form
published: true
polaroid: ""
eleventyNavigation:
  key: Ota yhteyttä
  order: 90
---


<!--
    Jos muutat tämän tiedoston nimeä (ota-yhteytta.md),
    muista muuttaa se myös _config.yml -tiedostoon
-->

Alla olevalla lomakkeella voit lähettää minulle helposti yhteydenottopyynnön tai muun viestin. Halutessasi voit myös lähettää minulle itse sähköpostia osoitteeseen <a href="mailto:{{ site.contact.email.normal }}">{{ site.contact.email.normal }}</a>.

Johtuen viime aikojen kasvaneesta yhteydenottojen määrästä, vastaan uusiin yhteydenottopyyntöihin tällä hetkellä ensisijaisesti sähköpostilla.

---

<script>
    function checkInfo() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var referrer = document.getElementById("referrer").value;
        var additionalReferrerInfo = document.getElementById("additionalReferrerInfo").value;
        var message = document.getElementById("message").value;

        document.getElementById("subject").value = "Yhteydenotto Nepparin kotisivuilta – " + name + " (" + Date.now() + ")";

        if (name === "") {
            alert("Hei! Kirjoitathan myös nimesi sille varattuun kenttään, kiitos!");
            return false;
        }

        if (email === "") {
            alert("Hei! Annathan sähköpostiosoitteesi, jotta voin ottaa sinuun yhteyttä. Kiitos!");
            return false;
        }

        if (referrer === "Valitse sopivin näistä vaihtoehdoista") {
            alert("Voisitko millään vielä valita alasvetovalikosta, että miten kuulit Nepparista. " +
                "Tämä tieto auttaa yritystäni huimasti. Kiitos!");
            return false;
        }

        if (referrer.indexOf(":") !== -1 && additionalReferrerInfo === "") {
            alert("Kaipaisin vielä hieman lisätietoja, mistä tarkemmin kuulit Nepparista. Voitko kirjoittaa siitä sanasen tai kaksi alasvetovalikon alapuolelle ilmestyneeseen kenttään. Kiitos!");
            return false;
        }

        if (email === "") {
            alert("Hei! Annathan sähköpostiosoitteesi, jotta voin ottaa sinuun yhteyttä. Kiitos!");
            return false;
        }

        if (message === "") {
            alert("Hei! Muistathan vielä kirjoittaa varsinaisen yhteydenottosi viestikenttään. Kiitos!");
            return false;
        }

        return true;
    }

    function referrerChanged() {
        var referrer = document.getElementById("referrer").value;
        var additionalInfoEl = document.getElementById("additionalReferrerInfo");
        var needsMoreInfo = referrer.indexOf(":") !== -1;
        if (needsMoreInfo) {
            var keyword = referrer.substr(referrer.indexOf(", ") + 2).replace(":", "");
            additionalInfoEl.placeholder = "Kirjoita tähän " + keyword;
        }
        additionalInfoEl.style.display = needsMoreInfo ? "block" : "none";
    }
</script>

<form class="pure-form pure-form-stacked contact-form" name="ota-yhteytta" data-netlify="true" onsubmit="return checkInfo();" method="POST" action="/kiitos-viestistasi">

    <input type="hidden" id="subject" name="subject" value="Yhteydenotto Nepparin kotisivuilta" />

    <input type="hidden" name="Muista" value="KUN VASTAAT TÄHÄN VIESTIIN, MUISTA MUUTTAA VASTAANOTTAJAN SÄHKÖPOSTIOSOITE ITSE ALLA MAINITUKSI!" />

    <div class="contact-form-part">
        <label for="name">Nimesi <span class="mandatory" title="Vaadittu tieto">*</span></label>
        <input id="name" type="text" name="name" class="pure-input-2-3" placeholder="Kirjoita nimesi tähän">
    </div>

    <div class="contact-form-part">
        <label for="email">Sähköpostiosoitteesi <span class="mandatory" title="Vaadittu tieto">*</span></label>
        <input id="email" type="email" name="email" class="pure-input-2-3" placeholder="Kirjoita sähköpostiosoitteesi tähän">
    </div>

    <div class="contact-form-part">
        <label for="telephone">Puhelinnumerosi</label>
        <input id="telephone" type="tel" name="telephone" class="pure-input-2-3" placeholder="Kirjoita puhelinnumerosi tähän">
    </div>

    <div class="contact-form-part">
        <label for="referrer">Miten kuulit Nepparista? <span class="mandatory" title="Vaadittu tieto">*</span></label>
        <select id="referrer" onchange="referrerChanged()" class="pure-input-1">
            <option>Valitse sopivin näistä vaihtoehdoista</option>
            <option>Netistä googlaamalla / hakukoneella</option>
            <option>Hoitotaho ohjasi, kuka:</option>
            <option>Tuttava vinkkasi</option>
            <option>Löysin paperisen mainoksen tai käyntikortin, mistä:</option>
            <option>Törmäsin Facebookissa</option>
            <option>Törmäsin LinkedInissä</option>
            <option>Muuten, miten:</option>
        </select>
        <input id="additionalReferrerInfo" type="text" name="additionalReferrerInfo"
            class="pure-input-1" placeholder="" style="display: none;">
    </div>

    <div class="contact-form-part">
        <label for="message">Viestisi <span class="mandatory" title="Vaadittu tieto">*</span></label>
        <textarea id="message" name="message" class="pure-input-1" placeholder="Ja kirjoita varsinainen viestisi tähän"></textarea>
    </div>

    <div class="contact-form-part">
        <input type="submit" name="submit" class="pure-button pure-input-1-2 pure-button-primary"
            value="Lähetä viesti" />
    </div>

</form>

<div class="other-things">
    <hr/>

    Muut asiat:
    <ul>
        <li><a href="/virheilmoitukset">
            Virheilmoitukset Nepparin palvelusta
        </a></li>
    </ul>
</div>
