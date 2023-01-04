# Forinov API

This [README.md](/README.md) contains a list of API calls as well as their use cases methods.

<u>Company profile :</u> ( **V5_GET_PROFILE** )

> ```markdown
> Parameters :
> - TYPE : startup / entreprise / partenaire
> - PID : id
> - authkey : Sorbonne
>Response :
> - This brings you informations about a profile according to the passed parameters.
> ```

<u>Company products :</u> ( **V5_GET_PRODUCTS** )

> ```markdown
> Parameters :
> - TYPE : startup / entreprise / partenaire
> - PID : id
> - authkey : Sorbonne
> Response :
> - This brings you informations about a profile's products list according to the passed parameters.
> ```

<u>Company activities :</u> ( **V5_GET_ACTIVITY_FEED_ITEMS** )

> ```markdown
> Parameters :
> - TYPE : startup / entreprise / partenaire
> - PID : profile id
> - authkey : Sorbonne
> Response :
> - This brings you informations about a profile's activity list according to the passed parameters.
> ```

<u>Company folders :</u> ( **V5_GET_FOLDERS** )

> ```markdown
> Parameters :
> - TYPE : startup / entreprise / partenaire
> - PID : profile id
> - authkey : Sorbonne
> Response :
> - This brings you informations about a profile's startup folders list according to the passed parameters.
> ```

<u>Landing opportunities :</u> ( **LANDING_OPPORTUNITES** )

> ```markdown
> Parameters :
> - app : next ( optional )
> - authkey : Landing
> Response :
> - This brings you the latest opportunities.
> ```

<u>Landing logos :</u> ( **LANDING_LOGOS** )

> ```markdown
> Parameters :
> - type : startup / entreprise / partenaire / opportunité
> - authkey : Landing
> Response :
> - This brings you logos of various companies that are registered in Forinov.
> ```